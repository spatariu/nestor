"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// src/models/index.ts
const sequelize_1 = require("sequelize");
// import  Person  from './person';
// import  Group  from './group';
const sequelize = new sequelize_1.Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'nestor_july',
    database: 'nestor',
    logging: false,
    //   models: [Person, Group], // Include all models
});
exports.sequelize = sequelize;
