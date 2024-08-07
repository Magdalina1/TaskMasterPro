import express from 'express';
import mongoose from 'mongoose';
import taskRoutes from './routes/taskRoutes.mjs'; // Update path if needed

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Use task routes
app.use('/tasks', taskRoutes);

// Define a route for the root path
app.get('/', (req, res) => {
    res.send('Welcome to TaskMasterPro API!');
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/taskmasterpro', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// Export the app for testing
export default app;
