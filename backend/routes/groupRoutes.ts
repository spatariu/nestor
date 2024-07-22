import { Router } from 'express';
import { createGroup, updateGroup, getGroups, deleteGroup, movePerson, moveGroup } from '../contollers/groupController';

const router = Router();

router.get('/', getGroups);
router.post('/', createGroup);
router.put('/:id', updateGroup);
router.delete('/:id', deleteGroup);
router.put('/move-person/:personId/:newGroupId', movePerson);
router.put('/move-group/:groupId/:newParentGroupId', moveGroup);

export default router;
