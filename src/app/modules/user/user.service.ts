/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already exists!');
  }
  if (await User.isUserNameExist(userData.username)) {
    throw new Error('User name already exists');
  }
  const result = await User.create(userData);
  const { password, ...resultWithoutPassword } = result.toObject();

  return resultWithoutPassword;
};

export const UserServices = {
  createUserIntoDB,
};
