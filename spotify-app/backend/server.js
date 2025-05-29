require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const PORT = 3001; // Port for your backend server

// Enable CORS for all routes
app.use(cors());

// A simple route to test backend is working
app.get('/api/data', (req, res) => {

  const data = {
    message: "Hello from the backend! 👋",
    timestamp: new Date().toLocaleTimeString()
  };

  res.json(data);
});

// Callback API for OAUTH
app.get('/api/callback', async (req, res) => {
    const code = req.query.code || null;

    if (!code) {
        console.error("No authorization code received from Spotify.");
        return res.status(400).send("Authorization code is missing.");
    }

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: process.env.SPOTIFY_CALLBACK_URL,
            }),
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + (Buffer.from(
                    process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET
                ).toString('base64')),
            },
        }); 

        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;

        // IMPORTANT: Store these tokens securely!
        res.redirect(`${process.env.FRONT_END_URL}/?access_token=${accessToken}`);
        console.log("Access Granted!")
        console.log(accessToken);
    } catch {
        res.status(500).send("Error during Spotify authentication");
    }
});

// API Call to get user profile details
app.get('/api/getUserProfile', async (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];

    if (!accessToken) {
        console.log("No access tokem provided");
        return res.status(401).send("Unauthorized: No Access Token");
    }

    try {
        const response = await axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'Authorization' : `Bearer ${accessToken}`
            }
        });
        console.log("Spotify User Profile:", response.data);
        res.json(response.data);
    } catch {
        console.log("Error during user profile retrieval", error);
        res.status(500).send("Error during user profile retreival");
    }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});