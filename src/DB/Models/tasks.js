const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    startpoint: {
        type: Date,
        required: true
    },
    endpoint: {
        type: Date,
        required: true
    },
    priority: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: 'Pending'
    },
    proyect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProyectTC'
    }
});

TaskSchema.plugin(timestamp);

const Task = mongoose.model('Task', TaskSchema);
const TaskTC = composeWithMongoose(Task);

module.exports = TaskTC;
