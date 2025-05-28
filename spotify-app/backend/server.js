require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios'); 

const app = express();
const PORT = 3001; // Port for your backend server

// Enable CORS for all routes
// This allows your React app at http://localhost:3000 to talk to this server
app.use(cors());

// A simple route to send data to your frontend
app.get('/api/data', (req, res) => {
  // This log will appear in your backend's terminal, NOT the browser
  console.log('Backend was hit!');

  // This is the data you will send to your React app
  const data = {
    message: "Hello from the backend! 👋",
    timestamp: new Date().toLocaleTimeString()
  };

  res.json(data);
});

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});