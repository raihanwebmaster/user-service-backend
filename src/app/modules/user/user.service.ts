/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId, userData.username)) {
    throw new Error('User already exists!');
  }
  const result = await User.create(userData);
  const { password, ...resultWithoutPassword } = result.toObject();

  return resultWithoutPassword;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select(
    "-password"
  );
  return result;
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB
};
