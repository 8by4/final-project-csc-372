import React, { useState } from 'react';
import '../App.css';
import '../css/Login.css';
import NavBar from '../components/navbarComponent';
import { loginUser } from '../services/accountService';
import { useNavigate } from 'react-router-dom';

function LogInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(username, password);

      if (data.user) {
        console.log("Logged in user:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="app-container">
      <NavBar />
      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        {error && <p className="signup-text">{error}</p>}
      </div>
    </div>
  );
}

export default LogInPage;