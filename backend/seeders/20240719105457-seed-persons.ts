import { QueryInterface } from 'sequelize';

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    const people = [];

    for (let i = 1; i <= 10; i++) {
      people.push({
        firstName: `FirstName${i}`,
        lastName: `LastName${i}`,
        jobTitle: `JobTitle${i}`,
        groupId: i, // Assuming each person belongs to a unique group for simplicity
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('People', people, {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('People', {}, {});
  },
};
