const TaskTC = require('../Models/task');

const TaskQuery = {
    taskById: TaskTC.getResolver('findById'),
    taskByIds: TaskTC.getResolver('findByIds'),
    taskOne: TaskTC.getResolver('findOne'),
    taskMany: TaskTC.getResolver('findMany'),
    taskCount: TaskTC.getResolver('count'),
    taskConnection: TaskTC.getResolver('connection'),
    taskPagination: TaskTC.getResolver('pagination')
};

const TaskMutation = {
    taskCreateOne: TaskTC.getResolver('createOne'),
    taskUpdateOne: TaskTC.getResolver('updateOne'),
    taskRemoveOne: TaskTC.getResolver('removeOne')
};

module.exports = { TaskQuery, TaskMutation };