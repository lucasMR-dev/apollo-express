const ProyectTC = require("../DB/Models/proyects");
const authMiddleware = require("../Auth/authMiddleware");

const ProyectQuery = {
  Proyect: ProyectTC.getResolver("findOne"),
  AllProyect: ProyectTC.getResolver("findMany"),
  ProyectCount: ProyectTC.getResolver("count"),
  ProyectPagination: ProyectTC.getResolver("pagination"),
};

const ProyectMutation = {
  proyectCreateOne: ProyectTC.getResolver("createOne", [authMiddleware]),
  proyectUpdateOne: ProyectTC.getResolver("updateOne", [authMiddleware]),
  proyectRemoveOne: ProyectTC.getResolver("removeOne", [authMiddleware]),
};

module.exports = { ProyectQuery, ProyectMutation };
