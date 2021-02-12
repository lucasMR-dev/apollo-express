const UserTC = require("../DB/Models/users");
const authMiddleware = require("../Auth/authMiddleware");

const UserQuery = {
  User: UserTC.getResolver("findOne"),
  AllUsers: UserTC.getResolver("findMany"),
  UserCount: UserTC.getResolver("count"),
  UserPagination: UserTC.getResolver("pagination"),
};

const UserMutation = {
  register: UserTC.getResolver("register"),
  login: UserTC.getResolver("Auth"),
  // Protected
  userUpdateOne: UserTC.getResolver("updateOne", [authMiddleware]),
  userRemoveOne: UserTC.getResolver("removeOne", [authMiddleware]),
};

module.exports = { UserQuery, UserMutation };
