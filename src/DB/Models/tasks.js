const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const ProyectTC = require("./proyects");
const EmployeeTC = require("./employees");

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  startpoint: {
    type: Date,
    required: true,
  },
  endpoint: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  proyect: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProyectTC",
  },
  employees:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EmployeeTC"
    }
  ]
});

TaskSchema.plugin(timestamp);

const Task = mongoose.model("Task", TaskSchema);
const TaskTC = composeWithMongoose(Task);

// Remove MongoID Fields
TaskTC.removeField(["proyect", "employees"]);

// Nested Fields
/**
 * Proyect Relation
 */
TaskTC.addRelation("proyect_related", {
  resolver: () => ProyectTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.proyect || [],
  },
  projection: { proyect: true },
});

/**
 * Employees Assigned
 */
TaskTC.addRelation("employees_assigned", {
  resolver: () => EmployeeTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (source) => source.employees || []
  },
  projection: { employees: true }
})
module.exports = TaskTC;
