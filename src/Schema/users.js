const UserTC = require('../DB/Models/users');

const UserQuery = {
    User: UserTC.getResolver('findOne'),
    AllUsers: UserTC.getResolver('findMany'),
    UserCount: UserTC.getResolver('count'),
    UserPagination: UserTC.getResolver('pagination')
};

const UserMutation = {
    userCreateOne: UserTC.getResolver('register'),
    userUpdateOne: UserTC.getResolver('updateOne'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    login: UserTC.getResolver('Auth')
};

module.exports = { UserQuery, UserMutation };
