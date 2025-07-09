import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <>
    <div className="home-container">
      <h1 className="home-title">Welcome to Hostel Query Management</h1>
      <div className="button-group">
        <Link to="/login">
          <button className="home-button">Login</button>
        </Link>
        <Link to="/register">
          <button className="home-button">Register</button>
        </Link>
      </div>
    </div>

    {/* Responsive and neat CSS inside the same file */}
   <style>{`
  .home-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    background: linear-gradient(to right, #e0f7fa, #ffffff);
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .home-title {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 30px;
    font-weight: 600;
  }

  .button-group {
    display: flex;
    flex-direction: row;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .home-button {
    padding: 12px 25px;
    font-size: 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .home-button:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
  }

  @media (max-width: 768px) {
    .home-title {
      font-size: 2rem;
    }

    .button-group {
      flex-direction: column;
      gap: 15px;
    }

    .home-button {
      width: 100%;
      max-width: 250px;
    }
  }
`}</style>

  </>
);

export default HomePage;