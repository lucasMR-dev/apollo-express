const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const moongose = require('mongoose');
const config = require('./config');
const Schema = require('./Schema');

const apollo = new ApolloServer({
    schema: Schema
});

const server = express();
apollo.applyMiddleware({
  server,
  cors: true
});

server.listen(config.PORT, () => {
  moongose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  });
});

const db = moongose.connection;

db.on("error", (err) => console.log(err));

db.once("open", () => console.log(`🚀 Server listening on port ${config.PORT}`));
