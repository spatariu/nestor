"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const seedGroups_1 = require("./seeders/seedGroups");
const seedPersons_1 = require("./seeders/seedPersons");
const prisma = new client_1.PrismaClient();
async function main() {
    const groups = await prisma.group.findMany();
    if (groups.length === 0) {
        await (0, seedGroups_1.seedGroups)();
    }
    const newGroups = await prisma.group.findMany();
    await (0, seedPersons_1.seedPersons)(newGroups);
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
