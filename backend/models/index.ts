import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Model, ModelStatic, Dialect } from 'sequelize'; // Import Dialect from Sequelize
import configFile from '../config/config.json'; // Import JSON configuration
import { Config } from '../types/config'; // Import TypeScript interface

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Validate the configuration type
const config: Config = configFile as unknown as Config; // Use `unknown` to bypass the type check

const db: { [key: string]: ModelStatic<Model> | Sequelize | typeof Sequelize } = {};

let sequelize: Sequelize;
const envConfig = config[env];

// Ensure `envConfig` is valid
if (!envConfig) {
  throw new Error(`Configuration for environment ${env} not found.`);
}

if (envConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[envConfig.use_env_variable] as string, {
    dialect: envConfig.dialect as Dialect, // Use Dialect type
    host: envConfig.host,
    username: envConfig.username,
    password: envConfig.password || '', // Provide a default if null
    database: envConfig.database,
  });
} else {
  sequelize = new Sequelize(envConfig.database, envConfig.username, envConfig.password || '', {
    dialect: envConfig.dialect as Dialect, // Use Dialect type
    host: envConfig.host,
  });
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' &&
      file.indexOf('.test.ts') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    (db[modelName] as any).associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
