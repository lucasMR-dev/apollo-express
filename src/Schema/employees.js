const EmployeeTC = require("../DB/Models/employees");
const authMiddleware = require("../Auth/authMiddleware");

const EmployeeQuery = {
  Employee: EmployeeTC.getResolver("findOne"),
  AllEmployees: EmployeeTC.getResolver("findMany"),
  EmployeeCount: EmployeeTC.getResolver("count"),
  EmployeePagination: EmployeeTC.getResolver("pagination"),
};

const EmployeeMutation = {
  employeeCreateOne: EmployeeTC.getResolver("createOne", [authMiddleware]),
  employeeUpdateOne: EmployeeTC.getResolver("updateOne", [authMiddleware]),
  employeeRemoveOne: EmployeeTC.getResolver("removeOne", [authMiddleware]),
  // Files
  employeeFileUpload: EmployeeTC.getResolver("imageupload"),
};

module.exports = { EmployeeQuery, EmployeeMutation };
