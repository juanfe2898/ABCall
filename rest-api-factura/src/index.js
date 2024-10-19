const express = require('express');
const incidentController = require('./Adapter/in_controller');

const app = express();
const port = 3002;

app.use('/rest/bill_management', incidentController);

app.listen(port, () => {
  console.log(`Microservicio escuchando en http://localhost:${port}`);
});