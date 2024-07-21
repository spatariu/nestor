// src/routes/personRoutes.ts
import { Router } from 'express';
import { createPerson, updatePerson, getPeople, deletePerson, movePerson } from '../contollers/personController';

const router = Router();

router.get('/', getPeople);
router.post('/', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);
router.put('/move-person/:personId/:newGroupId', movePerson);

export default router;
