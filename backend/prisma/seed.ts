import { PrismaClient } from '@prisma/client';
import { seedGroups } from './seeders/seedGroups';
import { seedPersons } from './seeders/seedPersons';

const prisma = new PrismaClient();

async function main() {
  const groups = await prisma.group.findMany();
  if (groups.length === 0) {
    await seedGroups();
  }

  const newGroups = await prisma.group.findMany();
  await seedPersons(newGroups);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
