//App.js
import './App.css';
import NavBar from './components/navbarComponent';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import card1 from './assets/6H.png';
import card2 from './assets/8S.png';

import LoginPage from './pages/LoginPage';
import AccountPage from './pages/AccountPage';
import GamePage from './pages/GamePage';
import SignupPage from './pages/SignupPage';


function HomePage() {
  return (
    <div className="app-container">
      <NavBar />
      <main className="app-title">
        <img src={card1} alt="Card1" className="card" />
        <h1 className="title-text">Welcome to the Blackjack Simulator!</h1>
        <img src={card2} alt="Card2" className="card" />
      </main>

      <div className="title-buttons">
        <Link to="/login"><button>Log In</button></Link>
        <Link to="/signup"><button>Sign Up</button></Link>
        <Link to="/play"><button>Play!</button></Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/play" element={<GamePage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
