import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const seedGroups = async () => {
  const groups: Array<{ id: number }> = [];
  for (let i = 1; i <= 10; i++) {
    const parentGroupId: number | null = i > 1 ? groups[Math.floor(Math.random() * groups.length)].id : null; // Randomly assign a parent group, except for the first group
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
