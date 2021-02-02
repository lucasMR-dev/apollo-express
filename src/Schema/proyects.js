const ProyectTC = require('../DB/Models/proyects');

const ProyectQuery = {
    Proyect: ProyectTC.getResolver('findOne'),
    AllProyect: ProyectTC.getResolver('findMany'),
    ProyectCount: ProyectTC.getResolver('count'),
    ProyectPagination: ProyectTC.getResolver('pagination')
};

const ProyectMutation = {
    proyectCreateOne: ProyectTC.getResolver('createOne'),
    proyectUpdateOne: ProyectTC.getResolver('updateOne'),
    proyectRemoveOne: ProyectTC.getResolver('removeOne')
};

module.exports = { ProyectQuery, ProyectMutation };