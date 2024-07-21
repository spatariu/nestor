// src/models/index.ts
import { Sequelize } from 'sequelize';
// import  Person  from './person';
// import  Group  from './group';

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'localhost', //process.env.DB_HOST,
  username: 'root', //process.env.DB_USER,
  password: 'nestor_july', //process.env.DB_PASSWORD,
  database: 'nestor', //process.env.DB_NAME,
  logging: false,
//   models: [Person, Group], // Include all models
});

export { sequelize };
