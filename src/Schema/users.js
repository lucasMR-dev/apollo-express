const {UserTC} = require("../DB/Models/users");
const authMiddleware = require("../Auth/authMiddleware");

const UserQuery = {
  User: UserTC.getResolver("findOne"),
  AllUsers: UserTC.getResolver("findMany"),
  UserConnection: UserTC.getResolver("connection"),
  UserCount: UserTC.getResolver("count"),
  UserPagination: UserTC.getResolver("pagination"),
};

const UserMutation = {
  // Protected
  updateUser: UserTC.getResolver("updateOne", [authMiddleware]),
  deleteUser: UserTC.getResolver("removeOne", [authMiddleware]),
};

module.exports = { UserQuery, UserMutation };
