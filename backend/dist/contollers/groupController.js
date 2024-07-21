"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveGroup = exports.movePerson = exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getGroups = void 0;
const group_1 = __importDefault(require("../models/group"));
const person_1 = __importDefault(require("../models/person"));
// Get all groups
const getGroups = async (req, res) => {
    try {
        const groups = await group_1.default.findAll();
        res.status(200).json(groups);
    }
    catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getGroups = getGroups;
// Create a new group
const createGroup = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Group name is required' });
    }
    try {
        const newGroup = await group_1.default.create({ name });
        res.status(201).json(newGroup);
    }
    catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createGroup = createGroup;
// Update a group by ID
const updateGroup = async (req, res) => {
    const groupId = parseInt(req.params.id, 10);
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Group name is required' });
    }
    try {
        const [updated] = await group_1.default.update({ name }, { where: { id: groupId } });
        if (updated) {
            const updatedGroup = await group_1.default.findByPk(groupId);
            res.status(200).json(updatedGroup);
        }
        else {
            res.status(404).json({ message: 'Group not found' });
        }
    }
    catch (error) {
        console.error('Error updating group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updateGroup = updateGroup;
// Delete a group by ID
const deleteGroup = async (req, res) => {
    const groupId = parseInt(req.params.id, 10);
    try {
        const deleted = await group_1.default.destroy({ where: { id: groupId } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Group not found' });
        }
    }
    catch (error) {
        console.error('Error deleting group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deleteGroup = deleteGroup;
// Move a person to a new group
const movePerson = async (req, res) => {
    const personId = parseInt(req.params.personId, 10);
    const newGroupId = parseInt(req.params.newGroupId, 10);
    try {
        const person = await person_1.default.findByPk(personId);
        const newGroup = await group_1.default.findByPk(newGroupId);
        if (!person) {
            return res.status(404).json({ message: 'Person not found' });
        }
        if (!newGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }
        person.groupId = newGroupId;
        await person.save();
        res.status(200).json(person);
    }
    catch (error) {
        console.error('Error moving person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.movePerson = movePerson;
// Move a group (including its members) to a new group
const moveGroup = async (req, res) => {
    const groupId = parseInt(req.params.groupId, 10);
    const newParentGroupId = parseInt(req.params.newParentGroupId, 10);
    try {
        const group = await group_1.default.findByPk(groupId, { include: [{ model: group_1.default, as: 'subGroups' }, { model: person_1.default, as: 'members' }] });
        const newParentGroup = await group_1.default.findByPk(newParentGroupId);
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
    }
    catch (error) {
        console.error('Error moving group:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.moveGroup = moveGroup;
