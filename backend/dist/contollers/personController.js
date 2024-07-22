"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movePerson = exports.deletePerson = exports.getPeople = exports.updatePerson = exports.createPerson = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createPerson = async (req, res) => {
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
    }
    catch (error) {
        console.error('Failed to create person:', error);
        res.status(500).json({ error: 'Failed to create person' });
    }
};
exports.createPerson = createPerson;
const updatePerson = async (req, res) => {
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
    }
    catch (error) {
        console.error('Failed to update person:', error);
        res.status(500).json({ error: 'Failed to update person' });
    }
};
exports.updatePerson = updatePerson;
const getPeople = async (req, res) => {
    try {
        // Fetch all people
        const people = await prisma.person.findMany();
        res.json(people);
    }
    catch (error) {
        console.error('Failed to fetch people:', error);
        res.status(500).json({ error: 'Failed to fetch people' });
    }
};
exports.getPeople = getPeople;
const deletePerson = async (req, res) => {
    const { id } = req.params;
    try {
        // Delete a person by ID
        await prisma.person.delete({
            where: { id: Number(id) },
        });
        res.status(204).end();
    }
    catch (error) {
        console.error('Failed to delete person:', error);
        res.status(500).json({ error: 'Failed to delete person' });
    }
};
exports.deletePerson = deletePerson;
const movePerson = async (req, res) => {
    const { personId, newGroupId } = req.params;
    try {
        // Update the group of the person
        const person = await prisma.person.update({
            where: { id: Number(personId) },
            data: { groupId: Number(newGroupId) },
        });
        res.json(person);
    }
    catch (error) {
        console.error('Failed to move person:', error);
        res.status(500).json({ error: 'Failed to move person' });
    }
};
exports.movePerson = movePerson;
