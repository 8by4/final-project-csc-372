// SignupPage.js

import React, { useState } from 'react';
import '../App.css';
import '../css/Login.css';
import NavBar from '../components/navbarComponent';
import { createUser } from '../services/accountService';
import { useNavigate} from 'react-router-dom';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const data = await createUser(username, password, email);

      if (data.user_id) {
        console.log("Created user:", data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/");
      } else {
        setError(data.message || "Signup failed");
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
        <form className="login-form" onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">Sign Up</button>
        </form>
        {error && <p className="signup-text">{error}</p>}
      </div>
    </div>
  );
}

export default SignupPage;