const UserTC = require('../Models/user');

const UserQuery = {
    userById: UserTC.getResolver('findById'),
    userByIds: UserTC.getResolver('findByIds'),
    userOne: UserTC.getResolver('findOne'),
    userMany: UserTC.getResolver('findMany'),
    userCount: UserTC.getResolver('count'),
    userConnection: UserTC.getResolver('connection'),
    userPagination: UserTC.getResolver('pagination')
};

const UserMutation = {
    userCreateOne: UserTC.getResolver('createOne'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userRemoveOne: UserTC.getResolver('removeOne')
};

module.exports = { UserQuery, UserMutation };