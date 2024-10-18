const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList,  GraphQLNonNull } = require('graphql');
const {getIncidents, createIncident }= require('../Domain/incidents-service');


const UsuarioType = new GraphQLObjectType({
  name: 'Usuario',
  fields: {
    idUsuario: { type: GraphQLInt },
    nombreUsuario: { type: GraphQLString },
    cedula: { type: GraphQLString },
    emailUsuario: { type: GraphQLString },
    telefonoUsuario: { type: GraphQLString },
    direccionUsuario: { type: GraphQLString }
  }
});


const IncidenteType = new GraphQLObjectType({
  name: 'Incidente',
  fields: {
    idIncidente: { type: GraphQLInt },
    tipoIncidente: { type: GraphQLString },
    descripcionIncidente: { type: GraphQLString },
    fechaIncidente: { type: GraphQLString },
    estadoIncidente: { type: GraphQLString },
    usuario: { type: UsuarioType },
    cedula: { type: GraphQLString }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    incidents: {
      type: new GraphQLList(IncidenteType),
      resolve(parent, args) {
        return getIncidents(); 
      }
    }
  }
});


const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createIncident: {
      type: IncidenteType,
      args: {
        tipoIncidente: { type: new GraphQLNonNull(GraphQLString) },
        descripcionIncidente: { type: new GraphQLNonNull(GraphQLString) },
        fechaIncidente: { type: new GraphQLNonNull(GraphQLString) },
        estadoIncidente: { type: new GraphQLNonNull(GraphQLString) },
        idUsuario: { type: new GraphQLNonNull(GraphQLInt) },
        cedula: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        return createIncident(args);
      }
    }
  }
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
