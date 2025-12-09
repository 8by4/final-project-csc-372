//AccountPage.js

import React, { useEffect, useState } from 'react';
import '../App.css';
import '../css/Login.css';
import NavBar from '../components/navbarComponent';
import { getUserById } from '../services/accountService';
import { Link } from "react-router-dom";

function AccountPage() {
    const [user, setUser] = useState(null);

    const fetchLatestUser = async () => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) return;
        const parsedUser = JSON.parse(storedUser);
        console.log("Stored user:", parsedUser);
        try {
            const latestUser = await getUserById(parsedUser.user_id);
            setUser(latestUser);
            localStorage.setItem("user", JSON.stringify(latestUser));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchLatestUser();
        const handleFocus = () => fetchLatestUser();
        window.addEventListener("focus", handleFocus);
        return () => window.removeEventListener("focus", handleFocus);
    }, []);

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
                    <Link to="/login" className="login-button">Go to Login</Link>
                </div>
            )}
        </div>
    );
}

export default AccountPage;
