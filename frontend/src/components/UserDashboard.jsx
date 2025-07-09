import React, { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8081/api",
});

export default function UserDashboard() {
  const [queries, setQueries] = useState([]);
  const [studentName, setStudentName] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [queryType, setQueryType] = useState("General");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("OPEN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  async function fetchQueries() {
    try {
      setLoading(true);
      const res = await api.get("/query");
      setQueries(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch queries.");
      setLoading(false);
    }
  }

  async function submitQuery(e) {
    e.preventDefault();
    setError(null);

    if (!studentName || !roomNumber || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const newQuery = {
        studentName,
        roomNumber,
        queryType,
        description,
        status,
      };

      await api.post("/query", newQuery);
      fetchQueries();

      setStudentName("");
      setRoomNumber("");
      setQueryType("General");
      setDescription("");
      setStatus("OPEN");
    } catch (err) {
      setError("Failed to submit query.");
    }
  }

  return (
    <div className="user-container">
      <h2 className="title">📬 Submit a Query</h2>

      <form onSubmit={submitQuery} className="form">
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="👤 Your Name"
          required
        />
        <input
          type="text"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          placeholder="🏠 Room Number"
          required
        />
        <select value={queryType} onChange={(e) => setQueryType(e.target.value)}>
          <option value="General">💬 General</option>
          <option value="Complaint">⚠ Complaint</option>
          <option value="Request">📩 Request</option>
        </select>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="📝 Describe your query"
          rows={4}
          required
        />
        <button type="submit" className="submit-btn">📤 Submit</button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      <h3 className="title">📋 Your Submitted Queries</h3>
      {loading ? (
        <p>Loading...</p>
      ) : queries.length === 0 ? (
        <p>No queries found.</p>
      ) : (
        <ul className="query-list">
          {queries.map((q) => (
            <li key={q.id} className="query-card">
              <div className="query-header">
                <span className="query-type">{q.queryType}</span>
                <span className={`status ${q.status.toLowerCase()}`}>
                  {q.status}
                </span>
              </div>
              <p className="user_name"><b>Name:</b> {q.studentName}</p>
              <p className="user_room"><b>Room:</b> {q.roomNumber}</p>
              <p className="description">{q.description}</p>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .user-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          min-height: 100vh;
          width: 100vw;
          background: linear-gradient(to right, #dff9fb, #ffffff);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .title {
          font-size: 28px;
          margin-bottom: 20px;
          text-align: center;
          color: #2d3436;
        }

        .form {
          background: #ffffff;
          padding: 25px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 600px;
          gap: 15px;
          margin-bottom: 30px;
        }

        .form input,
        .form select,
        .form textarea {
          padding: 12px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
          transition: border 0.3s ease;
        }

        .form input:focus,
        .form select:focus,
        .form textarea:focus {
          outline: none;
          border-color: #3498db;
        }

        .submit-btn {
          padding: 12px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .submit-btn:hover {
          background-color: #2980b9;
          transform: translateY(-2px);
        }

        .error-msg {
          color: #e74c3c;
          margin-bottom: 10px;
        }

        .query-list {
          width: 100%;
          max-width: 700px;
          padding: 0;
          list-style: none;
        }

        .query-card {
          background: #ffffff;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }

        .query-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
          .user_name{
          color:black;}

          .user_room{
          color:black;}

        .query-type {
          font-weight: bold;
          font-size: 16px;
          color: #2c3e50;
        }

        .status {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: bold;
          text-transform: uppercase;
        }

        .status.open {
          background-color: #ffeaa7;
          color: #e17055;
        }

        .status.resolved {
          background-color: #d1f5d3;
          color: #27ae60;
        }

        .description {
          margin-top: 10px;
          color: #555;
        }

        @media (max-width: 768px) {
          .title {
            font-size: 22px;
          }

          .form {
            padding: 20px;
          }

          .submit-btn {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
}
