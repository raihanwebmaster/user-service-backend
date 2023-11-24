import express from 'express';
import { UserControllers } from './user.controller';
import { UserZodSchema } from './user.validation';
import { handleZodValidation } from './user.validationMiddleware';

const router = express.Router();

router.post(
  '/',
  handleZodValidation(UserZodSchema),
  UserControllers.createUser,
);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.delete('/:userId', UserControllers.deleteUser);

export const UserRoutes = router;
