const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Task = require('../models/task');
const authMiddleware = require('../middleware/authMiddleware');
const { body, validationResult } = require('express-validator');


// API 3) : Create Task
router.post('/create', authMiddleware, [
    body('questionText', 'Question text is required').not().isEmpty()
], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 400,
            errors: errors.array(),
            message: 'Invalid input'
        });
    }

    const { questionText } = req.body;
    try {
        const task = await Task.create({
            userId: req.user.id,
            questionText,
            status: 'Not Completed',
            mistakes: 0
        });
        if (!task) {
            return res.status(404).json({
                code: 404,
                message: 'Task not found'
            });
        }
        res.status(201).json({
            code: 201,
            message: 'User successfully created a task',
            data: task
        });

    } catch (error) {
        console.log(error, '======error');

        res.status(500).json({
            code: 500,
            message: error.message ?? "somthing went wrong , please try again"
        });
    }
});



router.get('/task/:userId', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ usersId: req.user.userId });        
        console.log(tasks, '==========tasks');
        
        if (!tasks) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({
            code: 200,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error.message ?? "somthing went wrong , please try again"
        });
    }
});


// Update Task
router.put('/update/:userId', authMiddleware, [
    body('answerText', 'Answer text is required').not().isEmpty(),
    body('mistakes', 'Mistakes must be a number').isInt({ min: 0 }),
    body('status', 'Status must be either "Pass" or "Failed"').isIn(['Pass', 'Failed'])
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            code: 400,
            errors: errors.array(),
            message: 'Invalid input'
        });
    }
    const { answerText, mistakes, status } = req.user;
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.userId,
            { answerText, mistakes, status, updatedAt: Date.now() },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({
                code: 404,
                message: 'Task not found'
            });
        }
        res.status(200).json({
            code: 201,
            message: 'Task updated successfully',
            data: task
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error.message ?? "somthing went wrong , please try again"
        });
    }
});



module.exports = router



