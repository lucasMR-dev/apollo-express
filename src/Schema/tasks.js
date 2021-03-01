const TaskTC = require("../DB/Models/tasks");
const authMiddleware = require("../Auth/authMiddleware");

const TaskQuery = {
  Task: TaskTC.getResolver("findOne"),
  AllTasks: TaskTC.getResolver("findMany"),
  TaskConnection: TaskTC.getResolver("connection"),
  TaskCount: TaskTC.getResolver("count"),
  TaskPagination: TaskTC.getResolver("pagination"),
};

const TaskMutation = {
  // Protected
  createTask: TaskTC.getResolver("createOne", [authMiddleware]),
  updateTask: TaskTC.getResolver("updateOne", [authMiddleware]),
  deleteTask: TaskTC.getResolver("removeOne", [authMiddleware]),
};

module.exports = { TaskQuery, TaskMutation };
