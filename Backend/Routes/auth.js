const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const secret = 'jwt_secret';
const { body, validationResult } = require('express-validator');


// API 1) : User Sign Up 
router.post('/signup', [
    body('username', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid Email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            code: 400, 
            errors: errors.array(),
            message: 'Invalid input' 
        });
    }
    try {
        const { username, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashPassword
        });

        await user.save();

        res.status(201).json({
            code: 201,
            message: 'User registered successfully',
            data: user
        });

    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error.message ?? "somthing went wrong , please try again"
        })
    }
});


// API 2) : User Sign In
router.post('/signin', [
    body('email', 'Please enter a valid email').isEmail(),
    body('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            code: 400, 
            errors: errors.array(),
            message: 'Invalid input' 
        });
    }
    try {
        const { email, password } = req.body
        if (!email) {
            res.status(400).json({
                code: 400,
                message: 'Please enter email'
            })
        } else if (!password) {
            res.status(400).json({
                code: 400,
                message: 'Please enter password'
                // "password": "user1@123"    
            })

        } else {
            const isExist = await User.findOne({
                email: email,
            })

            if (isExist) {
                let isCorrect = await bcrypt.compare(password, isExist.password)
                if (isCorrect) {
                    const token = jwt.sign({ data: isExist }, secret , {
                        expiresIn: '24h'
                    })
                    res.status(200).json({
                        code: 200,
                        message: 'Login Success',
                        token: token
                    })
                } else {
                    res.status(400).json({
                        code: 400,
                        message: 'Provide password is not register'
                    })
                }
            } else {
                res.status(400).json({
                    code: 400,
                    message: 'Provide email is not register'
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: error.message ?? "somthing went wrong , please try again"
        })
    }
})


module.exports = router
