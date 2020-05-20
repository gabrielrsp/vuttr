import Sequelize from 'sequelize';

//import ModelX from '../app/models/ModelX;

import databaseConfig from '../config/database';

const models = [/*ModelX*/]

class Database {
  constructor() {
    this.init();
  }

  init(){
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
  }
}

export default new Database();
