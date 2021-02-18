const mongoose = require("mongoose");
const { composeWithMongoose } = require("graphql-compose-mongoose");
const { schemaComposer, toInputObjectType } = require("graphql-compose");
const { GraphQLUpload } = require("apollo-server-express");
const { createWriteStream } = require("fs");
const { join, parse } = require("path");
const config = require("../../config");
const { UserTC } = require("./users");
const ProyectTC = require("./proyects");
const TaskTC = require("./tasks");

const EmployeeSchema = new mongoose.Schema({
  names: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
  },
  phone: {
    type: String,
    default: "",
  },
  picture: {
    type: String,
    default: "",
    trim: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  proyectIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProyectTC",
    },
  ],
  tasksIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TaskTC",
    },
  ],
});

const Employee = mongoose.model("Employee", EmployeeSchema);
const EmployeeTC = composeWithMongoose(Employee);

// Remove MongoID Fields
EmployeeTC.removeField(["user", "proyectIds", "tasksIds"]);

/**
 * User Relation
 */
EmployeeTC.addRelation("users", {
  resolver: () => UserTC.getResolver("findById"),
  prepareArgs: {
    _id: (source) => source.user || [],
  },
  projection: { user: true },
});

/**
 * Proyect Relation
 */
EmployeeTC.addRelation("proyects", {
  resolver: () => ProyectTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (source) => source.projectIds || [],
  },
  projection: { proyectIds: true },
});

/**
 * Task Relation
 */
EmployeeTC.addRelation("task", {
  resolver: () => TaskTC.getResolver("findByIds"),
  prepareArgs: {
    _ids: (source) => source.tasksIds || [],
  },
  projection: { tasksIds: true },
});

// Object to be called on Resolver
const UploadTC = schemaComposer.createObjectTC({
  name: "uploader",
  fields: {
    // Args
    user: "String!",
    file: {
      description: "Image file.",
      type: GraphQLUpload,
    },
    // Return Fields
    employee: "String",
    imagepath: "String",
  },
});

// Convertion Object to Input
const uploaderITC = toInputObjectType(UploadTC);

/**
 * @imageupload
 * File Upload Resolver
 */

EmployeeTC.addResolver({
  kind: "mutation",
  name: "imageupload",
  type: UploadTC,
  args: {
    input: uploaderITC,
  },
  resolve: async ({ args }) => {
    return new Promise(async (resolve, reject) => {
      const user = args.input.user;
      // Get File properties
      const { filename, createReadStream } = await args.input.file;
      // Create readStream from request
      let stream = createReadStream();
      // Rename and Fix Path
      let { ext, name } = parse(filename);
      const saveFile = join(
        __dirname,
        `../../../Public/uploads/${new Date().toISOString() + name}${ext}`
      );
      // Save File to the server
      let uploadStream = createWriteStream(saveFile);
      await stream.pipe(uploadStream);
      // Save file path to the DB
      const path = `${config.BASE_PATH}${saveFile.split("Public/uploads")[1]}`;
      // Check if Employee exist
      const emp = await Employee.findOne({ user });
      if (emp) {
        // Update Picture Field
        const uptEmp = await Employee.findOneAndUpdate(
          { user: user },
          { picture: path },
          { new: true }
        );
        // Expose Custom Fields
        resolve({
          employee: uptEmp._id,
          imagepath: uptEmp.picture,
        });
      } else {
        reject("No Valid Employee");
      }
    });
  },
});

module.exports = EmployeeTC;
