import express from 'express';
import Task from '../models/taskModel.js';

const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    try {
        console.log('Creating a new task');
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        console.error('Error creating task:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all tasks');
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: err.message });
    }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
    try {
        console.log(`Fetching task with ID: ${req.params.id}`);
        const task = await Task.findById(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error('Error fetching task:', err);
        res.status(500).json({ message: err.message });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        console.log(`Updating task with ID: ${req.params.id}`);
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: err.message });
    }
});

// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        console.log(`Deleting task with ID: ${req.params.id}`);
        const task = await Task.findByIdAndDelete(req.params.id);
        if (task) {
            res.status(204).end(); // No content
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: err.message });
    }
});

export default router;
