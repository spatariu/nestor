"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize"); // Import Dialect from Sequelize
const config_json_1 = __importDefault(require("../config/config.json")); // Import JSON configuration
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// Validate the configuration type
const config = config_json_1.default; // Use `unknown` to bypass the type check
const db = {};
let sequelize;
const envConfig = config[env];
// Ensure `envConfig` is valid
if (!envConfig) {
    throw new Error(`Configuration for environment ${env} not found.`);
}
if (envConfig.use_env_variable) {
    sequelize = new sequelize_1.Sequelize(process.env[envConfig.use_env_variable], {
        dialect: envConfig.dialect,
        host: envConfig.host,
        username: envConfig.username,
        password: envConfig.password || '',
        database: envConfig.database,
    });
}
else {
    sequelize = new sequelize_1.Sequelize(envConfig.database, envConfig.username, envConfig.password || '', {
        dialect: envConfig.dialect,
        host: envConfig.host,
    });
}
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.ts' &&
        file.indexOf('.test.ts') === -1);
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(sequelize, sequelize_1.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
