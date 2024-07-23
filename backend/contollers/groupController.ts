import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createGroup = async (req: Request, res: Response) => {
  const { name, parentGroupId } = req.body;
  try {
    const group = await prisma.group.create({
      data: {
        name,
        parentGroupId,
      },
    });
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create group' });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, parentGroupId } = req.body;
  try {
    const group = await prisma.group.update({
      where: { id: Number(id) },
      data: { name, parentGroupId },
    });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update group' });
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await prisma.group.findMany({
      include: {
        parentGroup: {
          select: {
            name: true,
          },
        },
      },
    });
    res.json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ error: 'Failed to fetch groups' });
  }
};


export const deleteGroup = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.group.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete group' });
  }
};

export const movePerson = async (req: Request, res: Response) => {
  const { personId, newGroupId } = req.params;
  try {
    const person = await prisma.person.update({
      where: { id: Number(personId) },
      data: { groupId: Number(newGroupId) },
    });
    res.json(person);
  } catch (error) {
    res.status(500).json({ error: 'Failed to move person' });
  }
};

export const moveGroup = async (req: Request, res: Response) => {
  const { groupId, newParentGroupId } = req.params;
  try {
    const group = await prisma.group.update({
      where: { id: Number(groupId) },
      data: { parentGroupId: Number(newParentGroupId) },
    });
    res.json(group);
  } catch (error) {
    res.status(500).json({ error: 'Failed to move group' });
  }
};
