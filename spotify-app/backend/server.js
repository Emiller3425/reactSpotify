const express = require('express');
const cors = require('cors');

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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});