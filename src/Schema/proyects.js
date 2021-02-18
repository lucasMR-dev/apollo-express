const ProyectTC = require("../DB/Models/proyects");
const authMiddleware = require("../Auth/authMiddleware");

const ProyectQuery = {
  Proyect: ProyectTC.getResolver("findOne"),
  AllProyects: ProyectTC.getResolver("findMany"),
  ProyectConnection: ProyectTC.getResolver("connection"),
  ProyectCount: ProyectTC.getResolver("count"),
  ProyectPagination: ProyectTC.getResolver("pagination"),
};

const ProyectMutation = {
  createProyect: ProyectTC.getResolver("createOne", [authMiddleware]),
  updateProyect: ProyectTC.getResolver("updateOne", [authMiddleware]),
  deleteProyect: ProyectTC.getResolver("removeOne", [authMiddleware]),
};

module.exports = { ProyectQuery, ProyectMutation };
