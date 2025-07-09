import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8081/api/login", form);
      const user = res.data;
      console.log("Logged-in user:", user);

      if (!user.role) {
        alert("❌ Invalid response: Role not found.");
        return;
      }

      const { password, ...userData } = user;
      localStorage.setItem("user", JSON.stringify(userData));

      if (user.role === "admin") {
        alert(`🛡 Welcome Admin: ${user.email}`);
        navigate("/admin/dashboard");
      } else {
        alert(`✅ Welcome ${user.name || user.email}`);
        navigate("/user/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert(error.response?.data || "❌ Login failed");
    }
  };

  return (
    <>
      <div className="login-wrapper">
        <form onSubmit={handleSubmit} className="login-form">
          <h2 className="login-title">🔐 Login</h2>
          <input
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
        }

        .login-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(to right, #e0f7fa, #ffffff);
          padding: 20px;
        }

        .login-form {
          width: 100%;
          max-width: 400px;
          background-color: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 15px;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-title {
          margin-bottom: 10px;
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          color: #2c3e50;
        }

        .login-form input {
          padding: 12px;
          font-size: 16px;
          border-radius: 6px;
          border: 1px solid #ccc;
          transition: border 0.3s ease;
        }

        .login-form input:focus {
          border-color: #3498db;
          outline: none;
        }

        .login-form button {
          padding: 12px;
          font-size: 16px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }

        .login-form button:hover {
          background-color: #2980b9;
        }

        @media (max-width: 480px) {
          .login-form {
            padding: 20px;
          }

          .login-title {
            font-size: 20px;
          }

          .login-form input,
          .login-form button {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default LoginForm;