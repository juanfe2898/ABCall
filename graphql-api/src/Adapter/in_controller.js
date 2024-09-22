const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const getIncidents = require('../Domain/get-incidents');


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
    usuario: { type: UsuarioType }
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

module.exports = new GraphQLSchema({
  query: RootQuery
});
