const TaskTC = require('../Models/task');

const TaskQuery = {
    taskById: TaskTC.mongooseResolvers.findById(),
    taskByIds: TaskTC.mongooseResolvers.findByIds(),
    taskOne: TaskTC.mongooseResolvers.findOne(),
    taskMany: TaskTC.mongooseResolvers.findMany(),
    taskDataLoader: TaskTC.mongooseResolvers.dataLoader(),
    taskDataLoaderMany: TaskTC.mongooseResolvers.dataLoaderMany(),
    taskByIdLean: TaskTC.mongooseResolvers.findByIdLean(),
    taskByIdsLean: TaskTC.mongooseResolvers.findByIdsLean(),
    taskOneLean: TaskTC.mongooseResolvers.findOneLean(),
    taskManyLean: TaskTC.mongooseResolvers.findManyLean(),
    taskDataLoaderLean: TaskTC.mongooseResolvers.dataLoaderLean(),
    taskDataLoaderManyLean: TaskTC.mongooseResolvers.dataLoaderManyLean(),
    taskCount: TaskTC.mongooseResolvers.count(),
    taskConnection: TaskTC.mongooseResolvers.connection(),
    taskPagination: TaskTC.mongooseResolvers.pagination()
};

const TaskMutation = {
    taskCreateOne: TaskTC.mongooseResolvers.createOne(),
    taskCreateMany: TaskTC.mongooseResolvers.createMany(),
    taskUpdateById: TaskTC.mongooseResolvers.updateById(),
    taskUpdateOne: TaskTC.mongooseResolvers.updateOne(),
    taskUpdateMany: TaskTC.mongooseResolvers.updateMany(),
    taskRemoveById: TaskTC.mongooseResolvers.removeById(),
    taskRemoveOne: TaskTC.mongooseResolvers.removeOne(),
    taskRemoveMany: TaskTC.mongooseResolvers.removeMany()
};

module.exports = { TaskQuery, TaskMutation };