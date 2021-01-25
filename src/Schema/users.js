const UserTC = require('../DB/Models/users');

const UserQuery = {
    getUser: UserTC.getResolver('findOne'),
    getAllUsers: UserTC.getResolver('findMany'),
    getUserCount: UserTC.getResolver('count'),
    getUserPagination: UserTC.getResolver('pagination')
};

const UserMutation = {
    userUpdateOne: UserTC.getResolver('updateOne'),
    userRemoveOne: UserTC.getResolver('removeOne'),
    login: UserTC.getResolver('Auth')
};

module.exports = { UserQuery, UserMutation };
