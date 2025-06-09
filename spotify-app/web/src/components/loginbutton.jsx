import React, { useState } from 'react';

function LoginButton({displayText}) {

    const handleLogin = () => {
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const redirectUri = process.env.REACT_APP_SPOTIFY_CALLBACK_URL;

        // scopes / permissions we are requesting from the user
        const scopes = 'user-follow-read user-read-private user-read-email user-library-read playlist-read-private';

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;

        window.location.href = authUrl;
    }

    return (
        <button className="bg-emerald-500 rounded py-2 px-4" onClick={handleLogin}>
            {displayText}
        </button>
    );
}

export default LoginButton;