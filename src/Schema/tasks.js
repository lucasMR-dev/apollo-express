const TaskTC = require('../DB/Models/tasks');

const TaskQuery = {
    getTask: TaskTC.getResolver('findOne'),
    getAllTask: TaskTC.getResolver('findMany'),
    getTaskCount: TaskTC.getResolver('count'),
    getTaskPagination: TaskTC.getResolver('pagination')
}

const TaskMutation = {
    taskCreateOne: TaskTC.getResolver('createOne'),
    taskUpdateOne: TaskTC.getResolver('updateOne'),
    taskRemoveOne: TaskTC.getResolver('removeOne')
}

module.exports = { TaskQuery, TaskMutation };
