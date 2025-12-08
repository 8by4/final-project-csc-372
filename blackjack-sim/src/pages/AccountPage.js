import React, { useEffect, useState } from 'react';
import '../App.css';
import '../css/Login.css';
import NavBar from '../components/navbarComponent';

function AccountPage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setLoading(false);
    }, []);

    if (loading) {
        return <div><NavBar /><p>Loading...</p></div>;
    }

    return (
        <div className="app-container">
            <NavBar />

            {user ? (
                <div className="account-container">
                    <h2>Account</h2>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>ID:</strong> {user.user_id}</p>
                    <p><strong>Wins:</strong> {user.total_wins}</p>
                    <p><strong>Losses:</strong> {user.total_losses}</p>


                    <button
                        className="login-button"
                        onClick={() => {
                            localStorage.removeItem("user");
                            window.location.reload();
                        }}
                    >
                        Log Out
                    </button>
                </div>
            ) : (
                <div className="login-container">
                    <h2>You are not logged in</h2>
                    <a href="/login" className="login-button">Go to Login</a>
                </div>
            )}
        </div>
    );
}

export default AccountPage;