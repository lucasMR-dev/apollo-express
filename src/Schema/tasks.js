const TaskTC = require("../DB/Models/tasks");
const authMiddleware = require("../Auth/authMiddleware");

const TaskQuery = {
  Task: TaskTC.getResolver("findOne"),
  AllTask: TaskTC.getResolver("findMany"),
  TaskCount: TaskTC.getResolver("count"),
  TaskPagination: TaskTC.getResolver("pagination"),
};

const TaskMutation = {
  // Protected
  taskCreateOne: TaskTC.getResolver("createOne", [authMiddleware]),
  taskUpdateOne: TaskTC.getResolver("updateOne", [authMiddleware]),
  taskRemoveOne: TaskTC.getResolver("removeOne", [authMiddleware]),
};

module.exports = { TaskQuery, TaskMutation };
