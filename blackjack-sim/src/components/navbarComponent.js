import React from "react";
import '../css/navBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Blackjack Simulator</h1>
      </div>

      <div className="navbar-right">
        <a href="/" class="nav-button">Home</a>
        <a href="/stats" class="nav-button">Stats</a>
        <a href="/play" class="nav-button">Play</a>
        <a href="/login" class="nav-button">Login</a>
      </div>
    </nav>
  );
}

export default NavBar;