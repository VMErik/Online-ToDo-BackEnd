const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
    },
    list: [{
        id: {
            type: String,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        subtask: {
            type: String,
        },
    }],
    status: {
        type: String,
        enum: ['PENDIENTE', 'TERMINADO', 'ELIMINADO', 'PAPELERA']
    }
});

const task = mongoose.model('Task', taskSchema);
module.exports = task;