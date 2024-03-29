const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const moongose = require("mongoose");
const cors = require("cors");
const expressJWT = require("express-jwt");
const config = require("./config");
const graphQLSchema = require("./Schema");
const authRouter = require("./Routers/authRouter");

// Express Service Init
const app = express();

// Cors Config
app.use(cors());
app.use(express.json());

// Express JWT Middleware
app.use(
  expressJWT({
    credentialsRequired: false,
    secret: config.JWT_SECRET,
    algorithms: ["HS256"],
  })
);

// Express Rest Auth Handle 
app.use("/auth", authRouter);

// Static Files
app.use("/Public", express.static("Public/uploads"));

// Apollo Server Init
const server = new ApolloServer({
  schema: graphQLSchema,
  subscriptions: false,
  context: ({ req }) => {
    let loggedIn;
    const user = req.user || null;
    if (user != null) {
      loggedIn = true;
    } else {
      loggedIn = false;
    }
    return { loggedIn };
  },
});

// Apollo Config
server.applyMiddleware({
  app,
  cors: true,
  path: "/graphql",
});

// Express Config and MongoDB config
app.listen(config.PORT, () => {
  moongose.connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
});

// Log once server start up
const db = moongose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () =>
  console.log(`🚀 Server listening on port ${config.PORT}`)
);
