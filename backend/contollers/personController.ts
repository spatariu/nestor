import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createPerson = async (req: Request, res: Response) => {
  const { firstName, lastName, jobTitle, email, groupId } = req.body;
  
  try {
    // Create a new person
    const person = await prisma.person.create({
      data: {
        firstName,
        lastName,
        jobTitle,
        email,
        groupId,
      },
    });
    res.status(201).json(person);
  } catch (error) {
    console.error('Failed to create person:', error);
    res.status(500).json({ error: 'Failed to create person' });
  }
};

export const updatePerson = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { firstName, lastName, email, groupId } = req.body;

  try {
    // Update the person details
    const person = await prisma.person.update({
      where: { id: Number(id) },
      data: {
        firstName,
        lastName,
        email,
        groupId,
      },
    });
    res.json(person);
  } catch (error) {
    console.error('Failed to update person:', error);
    res.status(500).json({ error: 'Failed to update person' });
  }
};

export const getPeople = async (req: Request, res: Response) => {
  try {
    // Fetch all people
    const people = await prisma.person.findMany();
    res.json(people);
  } catch (error) {
    console.error('Failed to fetch people:', error);
    res.status(500).json({ error: 'Failed to fetch people' });
  }
};

export const deletePerson = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Delete a person by ID
    await prisma.person.delete({
      where: { id: Number(id) },
    });
    res.status(204).end();
  } catch (error) {
    console.error('Failed to delete person:', error);
    res.status(500).json({ error: 'Failed to delete person' });
  }
};

export const movePerson = async (req: Request, res: Response) => {
  const { personId, newGroupId } = req.params;

  try {
    // Update the group of the person
    const person = await prisma.person.update({
      where: { id: Number(personId) },
      data: { groupId: Number(newGroupId) },
    });
    res.json(person);
  } catch (error) {
    console.error('Failed to move person:', error);
    res.status(500).json({ error: 'Failed to move person' });
  }
};
