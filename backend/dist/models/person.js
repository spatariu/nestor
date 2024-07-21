"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const init_1 = require("./init");
class Person extends sequelize_1.Model {
}
Person.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    lastName: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    jobTitle: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    groupId: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'people',
    sequelize: init_1.sequelize,
});
exports.default = Person;
