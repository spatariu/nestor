"use strict";
const { QueryInterface, Sequelize } = require('sequelize'); // Runtime imports
const { Group } = require('../models'); // Import models if necessary
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const groups = [];
        for (let i = 1; i <= 10; i++) {
            groups.push({
                name: `Group ${i}`,
                parentGroupId: Math.random() < 0.5 ? 1 : null,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('Groups', groups, {});
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Groups', {}, {});
    },
};
