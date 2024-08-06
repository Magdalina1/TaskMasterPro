const express = require('express');
const app = express();
const taskRoutes = require('./routes/taskRoutes'); // Import task routes

app.use(express.json()); // Middleware to parse JSON
app.use('/tasks', taskRoutes); // Use task routes

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to TaskMasterPro API!');
});

module.exports = app;
