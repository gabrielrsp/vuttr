import express from 'express';
import routes from './routes';
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../src/swagger.json')


import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.server.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  }


  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
