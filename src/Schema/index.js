const { SchemaComposer } = require('graphql-compose');

const schemaComposer = new SchemaComposer();

const { ProyectQuery, ProyectMutation } = require('./proyects');
const { TaskQuery, TaskMutation } = require('./tasks');
const { UserQuery, UserMutation } = require('./users');

schemaComposer.Query.addFields({
    ...ProyectQuery,
    ...TaskQuery,
    ...UserQuery
});

schemaComposer.Mutation.addFields({
    ...ProyectMutation,
    ...TaskMutation,
    ...UserMutation
});

module.exports = schemaComposer.buildSchema();