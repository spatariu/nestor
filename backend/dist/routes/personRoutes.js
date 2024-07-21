"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/personRoutes.ts
const express_1 = require("express");
const personController_1 = require("../contollers/personController");
const router = (0, express_1.Router)();
router.get('/', personController_1.getPeople);
router.post('/', personController_1.createPerson);
router.put('/:id', personController_1.updatePerson);
router.delete('/:id', personController_1.deletePerson);
router.put('/move-person/:personId/:newGroupId', personController_1.movePerson);
exports.default = router;