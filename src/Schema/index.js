const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const { ProyectQuery, ProyectMutation } = require('./proyects');
const { TaskQuery, TaskMutation } = require('./tasks');
const { UserQuery, UserMutation } = require('./users');
const { EmployeeQuery, EmployeeMutation } = require('./employees');

schemaComposer.Query.addFields({
    ...ProyectQuery,
    ...TaskQuery,
    ...UserQuery,
    ...EmployeeQuery
});

schemaComposer.Mutation.addFields({
    ...ProyectMutation,
    ...TaskMutation,
    ...UserMutation,
    ...EmployeeMutation
});

module.exports = schemaComposer.buildSchema();