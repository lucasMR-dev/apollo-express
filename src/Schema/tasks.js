const TaskTC = require('../DB/Models/tasks');

const TaskQuery = {
    Task: TaskTC.getResolver('findOne'),
    AllTask: TaskTC.getResolver('findMany'),
    TaskCount: TaskTC.getResolver('count'),
    TaskPagination: TaskTC.getResolver('pagination')
}

const TaskMutation = {
    taskCreateOne: TaskTC.getResolver('createOne'),
    taskUpdateOne: TaskTC.getResolver('updateOne'),
    taskRemoveOne: TaskTC.getResolver('removeOne')
}

module.exports = { TaskQuery, TaskMutation };
