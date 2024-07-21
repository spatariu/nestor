// src/controllers/groupController.ts
import { Request, Response } from 'express';
import Group from '../models/group'; 
import Person from '../models/person'; 

// Get all groups
export const getGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.findAll();
    res.status(200).json(groups);
  } catch (error) {
    console.error('Error fetching groups:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Create a new group
export const createGroup = async (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Group name is required' });
  }

  try {
    const newGroup = await Group.create({ name });
    res.status(201).json(newGroup);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a group by ID
export const updateGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.id, 10);
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Group name is required' });
  }

  try {
    const [updated] = await Group.update({ name }, { where: { id: groupId } });

    if (updated) {
      const updatedGroup = await Group.findByPk(groupId);
      res.status(200).json(updatedGroup);
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error) {
    console.error('Error updating group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a group by ID
export const deleteGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.id, 10);

  try {
    const deleted = await Group.destroy({ where: { id: groupId } });

    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Group not found' });
    }
  } catch (error) {
    console.error('Error deleting group:', error);
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

// Move a group (including its members) to a new group
export const moveGroup = async (req: Request, res: Response) => {
  const groupId = parseInt(req.params.groupId, 10);
  const newParentGroupId = parseInt(req.params.newParentGroupId, 10);

  try {
    const group = await Group.findByPk(groupId, { include: [{ model: Group, as: 'subGroups' }, { model: Person, as: 'members' }] });
    const newParentGroup = await Group.findByPk(newParentGroupId);

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    if (!newParentGroup) {
      return res.status(404).json({ message: 'New parent group not found' });
    }

    // Move the group to the new parent group (assuming hierarchical model; adjust if necessary)
    group.parentGroupId = newParentGroupId;
    await group.save();

    // Optionally, handle nested groups and members if required

    res.status(200).json(group);
  } catch (error) {
    console.error('Error moving group:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
