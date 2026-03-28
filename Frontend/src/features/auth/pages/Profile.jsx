import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
import "../../interview/style/home.css"; // 👈 reuse same style

const Profile = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const onLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <div className="home-page profile-page">

            {/* Header */}
            <header className="page-header">
                <h1>My <span className="highlight">Profile</span></h1>
                <p>Your personal account details</p>
            </header>

            {/* Card */}
            <div className="interview-card">
                <div className="interview-card__body">

                    <div className="panel panel--right">

                        <div className="panel__header">
                            <h2>Your Profile</h2>
                        </div>

                        {/* Username */}
                        <div className="info-box">
                            <p><strong>Username: </strong> {user?.username}</p>
                        </div>

                        {/* Email */}
                        <div className="info-box">
                            <p><strong>Email: </strong> {user?.email}</p>
                        </div>

                        {/* Logout */}
                        <button 
                            className="generate-btn"
                            onClick={onLogout}
                        >
                            Logout
                        </button>

                    </div>

                </div>
            </div>

        </div>
    );
};

export default Profile;