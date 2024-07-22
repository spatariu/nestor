import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedGroups = async () => {
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
