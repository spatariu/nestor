// src/controllers/personController.ts
import { Request, Response } from 'express';
import Group from '../models/group'; 
import Person from '../models/person'; 

// Get all people
export const getPeople = async (req: Request, res: Response) => {
  try {
    const people = await Person.findAll({
      include: [{ model: Group, as: 'group' }], // Include associated group
    });
    res.status(200).json(people);
  } catch (error) {
    console.error('Error fetching people:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new person
export const createPerson = async (req: Request, res: Response) => {
  const { firstName, lastName, jobTitle, groupId } = req.body;

  if (!firstName || !lastName || !jobTitle) {
    return res.status(400).json({ message: 'First name, last name, and job title are required' });
  }

  try {
    const newPerson = await Person.create({ firstName, lastName, jobTitle, groupId });
    res.status(201).json(newPerson);
  } catch (error) {
    console.error('Error creating person:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a person by ID
export const updatePerson = async (req: Request, res: Response) => {
  const personId = parseInt(req.params.id, 10);
  const { firstName, lastName, jobTitle, groupId } = req.body;

  if (!firstName || !lastName || !jobTitle) {
    return res.status(400).json({ message: 'First name, last name, and job title are required' });
  }

  try {
    const [updated] = await Person.update({ firstName, lastName, jobTitle, groupId }, { where: { id: personId } });

    if (updated) {
      const updatedPerson = await Person.findByPk(personId);
      res.status(200).json(updatedPerson);
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    console.error('Error updating person:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a person by ID
export const deletePerson = async (req: Request, res: Response) => {
  const personId = parseInt(req.params.id, 10);

  try {
    const deleted = await Person.destroy({ where: { id: personId } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Person not found' });
    }
  } catch (error) {
    console.error('Error deleting person:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Move a person to a new group
export const movePerson = async (req: Request, res: Response) => {
  const personId = parseInt(req.params.personId, 10);
  const newGroupId = parseInt(req.params.newGroupId, 10);

  try {
    const person = await Person.findByPk(personId);
    const newGroup = await Group.findByPk(newGroupId);

    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }

    if (!newGroup) {
      return res.status(404).json({ message: 'Group not found' });
    }

    person.groupId = newGroupId;
    await person.save();

    res.status(200).json(person);
  } catch (error) {
    console.error('Error moving person:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
