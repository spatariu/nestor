"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const init_1 = require("./init");
class Group extends sequelize_1.Model {
}
Group.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: new sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    parentGroupId: {
        type: new sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    tableName: 'groups',
    sequelize: init_1.sequelize,
});
exports.default = Group;
