import express from 'express';
import { UserControllers } from './user.controller';
import { UserZodSchema } from './user.validation';
import { handleZodValidation } from './user.validationMiddleware';

const router = express.Router();

router.post(
  '/',
  handleZodValidation(UserZodSchema.createUserSchmea),
  UserControllers.createUser,
);
router.get('/', UserControllers.getAllUsers);
router.get('/:userId', UserControllers.getSingleUser);
router.put(
  '/:userId',
  handleZodValidation(UserZodSchema.updateUserZodSchema),
  UserControllers.updateSingleUser,
);
router.delete('/:userId', UserControllers.deleteUser);
router.put(
  '/:userId/orders',
  handleZodValidation(UserZodSchema.orderZodSchema),
  UserControllers.userProductStore,
);

router.get('/:userId/orders', UserControllers.getUserOrdersList);
router.get(
  '/:userId/orders/total-price',
  UserControllers.getUserOrdersTotalPrice,
);

export const UserRoutes = router;
