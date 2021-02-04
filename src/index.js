const express = require('express');
const { ApolloServer, AuthenticationError } = require('apollo-server-express');
const moongose = require('mongoose');
const config = require('./config');
const graphQLSchema = require('./Schema');
const tokenResolver = require('./Auth/tokenResolver');

// Apollo Server Init
const server = new ApolloServer({
    schema: graphQLSchema,
    context: (request) => {tokenResolver(request)}
});

// Express Service Init
const app = express();

// Apollo Config
server.applyMiddleware({
  app,
  cors: true,
  path: '/'
});

// Express Config and MongoDB config
app.listen(config.PORT, () => {
  moongose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

// Log once server start up
const db = moongose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log(`🚀 Server listening on port ${config.PORT}`));
