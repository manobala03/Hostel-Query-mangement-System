import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      alert("❌ Unauthorized access");
      navigate("/");
    } else {
      fetchComplaints();
    }
  }, [navigate]);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/query");
      console.log("Complaints fetched:", res.data);
      setComplaints(res.data);
    } catch (err) {
      console.error("Failed to fetch complaints:", err);
      alert("❌ Error loading complaints");
    } finally {
      setLoading(false);
    }
  };

  const handleResolve = async (id) => {
    try {
      const complaint = complaints.find((c) => c.id === id);
      if (!complaint) return;

      const updatedComplaint = {
        ...complaint,
        status: "resolved",
      };

      await axios.put(`http://localhost:8081/api/query/${id}`, updatedComplaint);
      alert("✅ Complaint marked as resolved");
      fetchComplaints();
    } catch (err) {
      console.error("Resolve failed:", err);
      alert("❌ Failed to update complaint");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?")) return;
    try {
      await axios.delete(`http://localhost:8081/api/query/${id}`);
      alert("🗑️ Complaint deleted");
      fetchComplaints();
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Failed to delete complaint");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">🛡 Admin Dashboard</h1>
      <p className="admin-subheading">📋 Complaints Received</p>

      {loading ? (
        <p className="admin-loading">Loading complaints...</p>
      ) : complaints.length === 0 ? (
        <p className="admin-nodata">No complaints found.</p>
      ) : (
        <ul className="admin-list">
          {complaints.map((c) => (
            <li key={c.id} className="admin-card">
              <p><strong>Student Name:</strong> {c.studentName}</p>
              <p><strong>Room Number:</strong> {c.roomNumber}</p>
              <p><strong>Query Type:</strong> {c.queryType}</p>
              <p><strong>Description:</strong> {c.description}</p>
              <p><strong>Status:</strong> {c.status}</p>

              <div className="button-group">
                {c.status.toLowerCase() !== "resolved" && (
                  <button onClick={() => handleResolve(c.id)} className="resolve-btn">
                    Mark as Resolved
                  </button>
                )}
                <button onClick={() => handleDelete(c.id)} className="delete-btn">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <button onClick={handleLogout} className="logout-btn">Logout</button>

      {/* Styled JSX for pleasant, modern look */}
      <style>{`
        .admin-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    min-height: 100vh;
    width: 100vw;
    padding: 40px 20px;
    background: linear-gradient(to right, #e0f7fa, #ffffff);
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

        .admin-heading {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 10px;
          color: #2c3e50;
        }

        .admin-subheading {
          text-align: center;
          font-size: 20px;
          margin-bottom: 25px;
          color: #555;
        }

        .admin-loading,
        .admin-nodata {
          text-align: center;
          font-size: 18px;
          color: #666;
          margin-top: 20px;
        }

        .admin-list {
          list-style: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .admin-card {
          background: #fefefe;
          border: 1px solid #ddd;
          padding: 20px;
          color:black;
          border-radius: 12px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
          transition: transform 0.2s ease-in-out;
        }

        .admin-card:hover {
          transform: scale(1.01);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
        }

        .button-group {
          margin-top: 15px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .resolve-btn, .delete-btn, .logout-btn {
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          color: #fff;
          cursor: pointer;
          font-weight: 500;
          transition: background 0.3s, transform 0.2s;
        }

        .resolve-btn {
          background-color: #28a745;
        }

        .resolve-btn:hover {
          background-color: #218838;
          transform: translateY(-1px);
        }

        .delete-btn {
          background-color: #dc3545;
        }

        .delete-btn:hover {
          background-color: #c82333;
          transform: translateY(-1px);
        }

        .logout-btn {
          margin-top: 40px;
          display: block;
          margin-left: auto;
          margin-right: auto;
          background-color: #d00000;
        }

        .logout-btn:hover {
          background-color: #a30000;
          transform: translateY(-1px);
        }

        @media (max-width: 768px) {
          .admin-heading {
            font-size: 2rem;
          }

          .button-group {
            flex-direction: column;
            gap: 10px;
          }

          .resolve-btn, .delete-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
