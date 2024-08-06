const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const taskController = require('../controllers/taskController'); // Adjust this path if necessary

// Validation rules for task data
const taskValidation = [
    body('name')
        .isString()
        .notEmpty()
        .withMessage('Name is required and must be a string'),
    body('completed')
        .isBoolean()
        .withMessage('Completed must be a boolean')
];

// Validation for ID parameter
const idValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid task ID')
];

// Define routes with validation middleware

// Get all tasks
router.get('/', taskController.getTasks);

// Create a new task
router.post(
    '/',
    taskValidation,
    taskController.createTask
);

// Get a task by ID
router.get(
    '/:id',
    idValidation,
    taskController.getTaskById
);

// Update a task
router.put(
    '/:id',
    idValidation,
    taskValidation,
    taskController.updateTask
);

// Delete a task
router.delete(
    '/:id',
    idValidation,
    taskController.deleteTask
);

module.exports = router;
