const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const taskSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    questionText: {
        type: String,
        required: true
    },
    answerText: {
        type: String,
        default: null
    },
    mistakes: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: 'Not Completed'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});


const Task = mongoose.model('Task', taskSchema);
module.exports = Task;


