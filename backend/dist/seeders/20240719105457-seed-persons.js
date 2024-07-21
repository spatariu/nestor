"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = {
    up: async (queryInterface) => {
        const people = [];
        for (let i = 1; i <= 10; i++) {
            people.push({
                firstName: `FirstName${i}`,
                lastName: `LastName${i}`,
                jobTitle: `JobTitle${i}`,
                groupId: i,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }
        await queryInterface.bulkInsert('People', people, {});
    },
    down: async (queryInterface) => {
        await queryInterface.bulkDelete('People', {}, {});
    },
};
