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