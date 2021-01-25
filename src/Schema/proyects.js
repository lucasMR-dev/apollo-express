const ProyectTC = require('../DB/Models/proyects');

const ProyectQuery = {
    getProyect: ProyectTC.getResolver('findOne'),
    getAllProyect: ProyectTC.getResolver('findMany'),
    getProyectCount: ProyectTC.getResolver('count'),
    getProyectPagination: ProyectTC.getResolver('pagination')
};

const ProyectMutation = {
    proyectCreateOne: ProyectTC.getResolver('createOne'),
    proyectUpdateOne: ProyectTC.getResolver('updateOne'),
    proyectRemoveOne: ProyectTC.getResolver('removeOne')
};

module.exports = { ProyectQuery, ProyectMutation };