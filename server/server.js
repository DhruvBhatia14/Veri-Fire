// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = 5000; // Port number for the server

// Use CORS middleware to handle CORS issues
app.use(cors());

// Route to fetch data from the external API
app.get('/api/alerts', async (req, res) => {
    try {
        const response = await axios.get('https://5j6emnbnq6.execute-api.us-west-2.amazonaws.com/Dev/data');
        const data = JSON.parse(response.data.body);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});