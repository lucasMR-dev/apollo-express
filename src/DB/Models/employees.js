const mongoose = require('mongoose');
const { composeWithMongoose } = require('graphql-compose-mongoose');
const { GraphQLUpload } = require('apollo-server-express');
const { createWriteStream } = require('fs');
const ProyectTC = require('./proyects');
const TaskTC = require('./tasks');

const EmployeeSchema = new mongoose.Schema({
    names: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    birthday: {
        type: String
    },
    phone: {
        type: String,
        default: ''
    },
    picture: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    proyectIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProyectTC'
    }],
    tasksIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TaskTC'
    }]
});

const Employee = mongoose.model('Employee', EmployeeSchema);
const EmployeeTC = composeWithMongoose(Employee);

/**
 * Proyect Relation
 */
EmployeeTC.addRelation(
    'proyects',
    () => ({
      resolver: ProyectTC.getResolver('findMany'),
      args: {
        filter: source => ({
          _operators:{
            _id:{
              in: source.proyectIds || []
            }
          }
        }),
      },
      projection: { proyectIds: true },
    })
);
/**
 * Task Relation
 */
EmployeeTC.addRelation(
    'tasks',
    () => ({
      resolver: TaskTC.getResolver('findMany'),
      args: {
        filter: source => ({
          _operators:{
            _id:{
              in: source.tasksIds || []
            }
          }
        }),
      },
      projection: { tasksIds: true },
    })
);
/**
 * @imageupload
 * File Upload Resolver
 */

EmployeeTC.addResolver({
  kind: 'mutation',
  name: 'imageupload',
  type: EmployeeTC,
  args: {
    employee: {
      type: 'String!'
    },
    image: {
      description: 'Image file.',
      type: GraphQLUpload,
    }
  },
  resolve: async (parent, {args}) => {
    return new Promise( async (resolve, reject) => {
      const { employee } = args.employee;
      // Get File properties
      const { filename, mimetype, createReadStream } = await args.image;
      const stream = createReadStream();
      const {file, ext } = parse(filename,mimetype);
      const saveFile = join(___dirname, `../../Public/uploads/${file}${ext}`);
      const uploadStream = await createWriteStream(saveFile);
      await stream.pipe(uploadStream(saveFile));
      const picture = `http://localhost:4000/${saveFile}`;
      const saveEmployee = Employee.findById(employee);
      if(saveEmployee){
        const uptEmp = await Employee.findOneAndUpdate({_id: employee}, picture, {runValidators: true, new: true});
        resolve(uptEmp);
      } else {
        reject ('No Valid Employee');
      }    
  })
}
});

module.exports = EmployeeTC;