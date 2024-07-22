"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedPersons = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seedPersons = async (groups) => {
    for (let i = 1; i <= 10; i++) {
        await prisma.person.create({
            data: {
                firstName: `FirstName ${i}`,
                lastName: `LastName ${i}`,
                jobTitle: `JobTitle ${i}`,
                email: `test${i}@test.com`,
                createdAt: new Date(),
                updatedAt: new Date(),
                group: {
                    connect: { id: groups[Math.floor(Math.random() * groups.length)].id },
                },
            },
        });
    }
};
exports.seedPersons = seedPersons;
