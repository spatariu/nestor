"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/groupRoutes.ts
const express_1 = require("express");
const groupController_1 = require("../contollers/groupController");
const router = (0, express_1.Router)();
router.get('/', groupController_1.getGroups);
router.post('/', groupController_1.createGroup);
router.put('/:id', groupController_1.updateGroup);
router.delete('/:id', groupController_1.deleteGroup);
router.put('/move-person/:personId/:newGroupId', groupController_1.movePerson);
router.put('/move-group/:groupId/:newParentGroupId', groupController_1.moveGroup);
exports.default = router;
