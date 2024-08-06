const mongoose = require('mongoose');
const Task = require('../models/task'); // Ensure this path is correct

// Helper function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Define the functions and export them
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createTask = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getTaskById = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid task ID');
        }
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateTask = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid task ID');
        }
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.json(task); // Respond with the updated task
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteTask = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).send('Invalid task ID');
        }
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.status(204).send(); // Send 204 No Content status code
    } catch (error) {
        res.status(500).send(error.message);
    }
};
