import './App.css';
import NavBar from './components/navbarComponent';

function LogInPage() {
  return (
    <div className="app-container">
      <NavBar />

      <div className="title-buttons">
        <a href="/login.js"></a>
        <button>Log In</button>
     
        <button>Sign Up</button>
      </div>

    </div>
  );
}

export default LogInPage;
