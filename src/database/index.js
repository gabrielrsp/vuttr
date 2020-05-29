import Sequelize from 'sequelize';

import User from '../app/models/User';
import Tool from '../app/models/Tool';
import databaseConfig from '../config/database';

const models = [User, Tool]

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
