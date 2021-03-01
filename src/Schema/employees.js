const EmployeeTC = require("../DB/Models/employees");
const authMiddleware = require("../Auth/authMiddleware");

const EmployeeQuery = {
  Employee: EmployeeTC.getResolver("findOne"),
  AllEmployees: EmployeeTC.getResolver("findMany"),
  EmployeeConnection: EmployeeTC.getResolver("connection"),
  EmployeeCount: EmployeeTC.getResolver("count"),
  EmployeePagination: EmployeeTC.getResolver("pagination"),
};

const EmployeeMutation = {
  createEmployee: EmployeeTC.getResolver("createOne", [authMiddleware]),
  updateEmployee: EmployeeTC.getResolver("updateOne", [authMiddleware]),
  deleteEmployee: EmployeeTC.getResolver("removeOne", [authMiddleware]),
  // Files
  employeeFileUpload: EmployeeTC.getResolver("imageupload"),
};

module.exports = { EmployeeQuery, EmployeeMutation };
