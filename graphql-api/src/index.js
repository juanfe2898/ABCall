const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const graphqlController = require('./Adapter/in_controller');

const app = express();
const port = 4000;

// Enable CORS for all origins
app.use(cors());

// Registro de GraphQL en el path
app.use('/graphql/incident_management/incident/', graphqlHTTP({
  schema: graphqlController,
  graphiql: true,  // Habilita la herramienta GraphiQL para pruebas
}));

app.listen(port, () => {
  console.log(`Microservicio GraphQL escuchando en http://localhost:${port}`);
});