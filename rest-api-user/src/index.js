const express = require('express');
const userController = require('./Adapter/in_controller');

const app = express();
const port = 3001;
app.use(express.json());
app.use('/rest/user', userController);

app.listen(port, () => {
  console.log(`Microservicio escuchando en http://localhost:${port}`);
});