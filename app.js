const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/taskRoutes');
const config = require('./config/config');
const { validationResult } = require('express-validator');

const app = express();
app.use(express.json());

// Route handling and validation middleware
app.use('/tasks', taskRoutes);

// Error handling middleware for validation errors
app.use((err, req, res, next) => {
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ message: err.message });
    }
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    if (err instanceof Error) {
        return res.status(500).json({ message: err.message });
    }
    next(err);
});

// Connect to MongoDB and start the server
mongoose.connect(config.dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Could not connect to MongoDB:', err));

module.exports = app; // Export the app for testing
