import React from "react";
import '../css/navBar.css';
import { Link } from "react-router-dom"; 


function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Blackjack Simulator</h1>
      </div>

      <div className="navbar-right">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/account" className="nav-button">Account</Link>
        <Link to="/play" className="nav-button">Play</Link>
        <Link to="/login" className="nav-button">Login</Link>
      </div>
    </nav>
  );
}

export default NavBar;