"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveGroup = exports.movePerson = exports.deleteGroup = exports.getGroups = exports.updateGroup = exports.createGroup = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createGroup = async (req, res) => {
    const { name, parentGroupId } = req.body;
    try {
        const group = await prisma.group.create({
            data: {
                name,
                parentGroupId,
            },
        });
        res.status(201).json(group);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create group' });
    }
};
exports.createGroup = createGroup;
const updateGroup = async (req, res) => {
    const { id } = req.params;
    const { name, parentGroupId } = req.body;
    try {
        const group = await prisma.group.update({
            where: { id: Number(id) },
            data: { name, parentGroupId },
        });
        res.json(group);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update group' });
    }
};
exports.updateGroup = updateGroup;
const getGroups = async (req, res) => {
    try {
        const groups = await prisma.group.findMany();
        res.json(groups);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch groups' });
    }
};
exports.getGroups = getGroups;
const deleteGroup = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.group.delete({ where: { id: Number(id) } });
        res.status(204).end();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete group' });
    }
};
exports.deleteGroup = deleteGroup;
const movePerson = async (req, res) => {
    const { personId, newGroupId } = req.params;
    try {
        const person = await prisma.person.update({
            where: { id: Number(personId) },
            data: { groupId: Number(newGroupId) },
        });
        res.json(person);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to move person' });
    }
};
exports.movePerson = movePerson;
const moveGroup = async (req, res) => {
    const { groupId, newParentGroupId } = req.params;
    try {
        const group = await prisma.group.update({
            where: { id: Number(groupId) },
            data: { parentGroupId: Number(newParentGroupId) },
        });
        res.json(group);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to move group' });
    }
};
exports.moveGroup = moveGroup;
