const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const ProyectTC = require('./proyects');
const TaskTC = require('./tasks');

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
    proyectIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProyectTC'
    }],
    tasksIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskTC'
    }]
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const EmployeeTC = composeWithMongoose(Employee);

/**
 * Proyect Relation
 */
EmployeeTC.addRelation(
    'proyects',
    () => ({
      resolver: ProyectTC.getResolver('findMany'),
      args: {
        filter: source => ({
          _operators:{
            _id:{
              in: source.proyectIds || []
            }
          }
        }),
      },
      projection: { proyectIds: true },
    })
);
/**
 * Task Relation
 */
EmployeeTC.addRelation(
    'tasks',
    () => ({
      resolver: TaskTC.getResolver('findMany'),
      args: {
        filter: source => ({
          _operators:{
            _id:{
              in: source.tasksIds || []
            }
          }
        }),
      },
      projection: { tasksIds: true },
    })
);

module.exports = EmployeeTC;