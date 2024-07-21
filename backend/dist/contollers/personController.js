"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.movePerson = exports.deletePerson = exports.updatePerson = exports.createPerson = exports.getPeople = void 0;
const group_1 = __importDefault(require("../models/group"));
const person_1 = __importDefault(require("../models/person"));
// Get all people
const getPeople = async (req, res) => {
    try {
        const people = await person_1.default.findAll({
            include: [{ model: group_1.default, as: 'group' }], // Include associated group
        });
        res.status(200).json(people);
    }
    catch (error) {
        console.error('Error fetching people:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getPeople = getPeople;
// Create a new person
const createPerson = async (req, res) => {
    const { firstName, lastName, jobTitle, groupId } = req.body;
    if (!firstName || !lastName || !jobTitle) {
        return res.status(400).json({ message: 'First name, last name, and job title are required' });
    }
    try {
        const newPerson = await person_1.default.create({ firstName, lastName, jobTitle, groupId });
        res.status(201).json(newPerson);
    }
    catch (error) {
        console.error('Error creating person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createPerson = createPerson;
// Update a person by ID
const updatePerson = async (req, res) => {
    const personId = parseInt(req.params.id, 10);
    const { firstName, lastName, jobTitle, groupId } = req.body;
    if (!firstName || !lastName || !jobTitle) {
        return res.status(400).json({ message: 'First name, last name, and job title are required' });
    }
    try {
        const [updated] = await person_1.default.update({ firstName, lastName, jobTitle, groupId }, { where: { id: personId } });
        if (updated) {
            const updatedPerson = await person_1.default.findByPk(personId);
            res.status(200).json(updatedPerson);
        }
        else {
            res.status(404).json({ message: 'Person not found' });
        }
    }
    catch (error) {
        console.error('Error updating person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.updatePerson = updatePerson;
// Delete a person by ID
const deletePerson = async (req, res) => {
    const personId = parseInt(req.params.id, 10);
    try {
        const deleted = await person_1.default.destroy({ where: { id: personId } });
        if (deleted) {
            res.status(204).send();
        }
        else {
            res.status(404).json({ message: 'Person not found' });
        }
    }
    catch (error) {
        console.error('Error deleting person:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.deletePerson = deletePerson;
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
