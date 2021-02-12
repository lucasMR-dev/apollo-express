const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const { composeWithMongoose } = require("graphql-compose-mongoose");

const ProyectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  startpoint: {
    type: Date,
    required: true,
  },
  endpoint: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

ProyectSchema.plugin(timestamp);

const Proyect = mongoose.model("Proyect", ProyectSchema);
const ProyectTC = composeWithMongoose(Proyect);
module.exports = ProyectTC;
