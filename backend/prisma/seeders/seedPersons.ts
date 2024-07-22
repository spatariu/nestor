import { PrismaClient, Group } from '@prisma/client';

const prisma = new PrismaClient();

export const seedPersons = async (groups: Group[]) => {
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
