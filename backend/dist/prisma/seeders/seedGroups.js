"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedGroups = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const seedGroups = async () => {
    const groups = [];
    for (let i = 1; i <= 10; i++) {
        const group = await prisma.group.create({
            data: {
                name: `Group ${i}`,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        groups.push(group);
    }
    return groups;
};
exports.seedGroups = seedGroups;
