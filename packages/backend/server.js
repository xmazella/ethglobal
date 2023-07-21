// app.js (or server.js)

const express = require('express');
const app = express();

// Parse JSON bodies (middleware to handle incoming JSON data)
app.use(express.json());

// POST route for /connect
app.post('/connect', (req, res) => {
  // Check if the JSON object has the 'sismo_proof' property
  if (req.body && req.body.sismo_proof) {
    // Respond with a 200 status code if 'sismo_proof' property is present
    res.sendStatus(200);
  } else {
    // Respond with a 400 status code if 'sismo_proof' property is missing
    res.status(400).send("Bad Request: 'sismo_proof' property is missing from the JSON object.");
  }
});

// Start the server
const port = 3000; // You can change this to any port number you want
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});