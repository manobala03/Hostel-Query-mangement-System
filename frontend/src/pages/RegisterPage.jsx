import React, { useState } from 'react';
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await api.post('/register', { name, email, password, role });
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        setError(err.response.data);
      } else {
        setError("Registration failed: Server not responding");
      }
    }
  };

  return (
    <>
      <div className="register-wrapper">
        <div className="register-container">
          <h2 className="register-title">Register</h2>

          {error && <p className="error-text">{error}</p>}
          {success && <p className="success-text">{success}</p>}

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              required
            />
          </div>

          <div className="form-group">
            <label>Role:</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="warden">Warden</option>
            </select>
          </div>

          <button onClick={handleRegister} className="register-btn">Register</button>
        </div>
      </div>

      {/* Modern, centered, responsive CSS */}
      <style>{`
      .register-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(to right, #e0f7fa, #ffffff);
  padding: 20px;
  box-sizing: border-box;
}


        .register-container {
          width: 100%;
          max-width: 450px;
          background: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }

        .register-title {
          text-align: center;
          margin-bottom: 25px;
          color: #2c3e50;
          font-weight: 600;
        }

        .form-group {
          margin-bottom: 15px;
        }

        label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        input, select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 15px;
          transition: border-color 0.3s;
        }

        input:focus, select:focus {
          outline: none;
          border-color: #3498db;
        }

        .register-btn {
          width: 100%;
          padding: 12px;
          background-color: #3498db;
          color: white;
          font-size: 16px;
          font-weight: bold;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .register-btn:hover {
          background-color: #2980b9;
        }

        .error-text {
          color: red;
          text-align: center;
          margin-bottom: 10px;
        }

        .success-text {
          color: green;
          text-align: center;
          margin-bottom: 10px;
        }

        @media (max-width: 500px) {
          .register-container {
            padding: 20px;
          }

          .register-title {
            font-size: 22px;
          }

          .register-btn {
            font-size: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default RegisterPage;