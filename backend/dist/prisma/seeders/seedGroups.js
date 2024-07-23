"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedGroups = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seedGroups = async () => {
    const groups = [];
    for (let i = 1; i <= 10; i++) {
        const parentGroupId = i > 1 ? groups[Math.floor(Math.random() * groups.length)].id : null; // Randomly assign a parent group, except for the first group
        const group = await prisma.group.create({
            data: {
                name: `Group ${i}`,
                parentGroupId: parentGroupId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        groups.push(group);
    }
    return groups;
};
exports.seedGroups = seedGroups;
