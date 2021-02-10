const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');

const EmployeeSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    phone: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    proyect: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'ProyectTC'
    }],
    task: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'TaskTC'
    }]
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const EmployeeTC = composeWithMongoose(Employee);

module.exports = EmployeeTC;