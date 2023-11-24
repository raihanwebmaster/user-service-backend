/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { CustomError } from '../../CustomError';
import { IUpdateUser, IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: IUser) => {
  if (await User.isUserExists(userData.userId, userData.username)) {
    throw new CustomError('User already exists!', 404, 'User already exists!');
  }
  const result = await User.create(userData);
  const { password, _id, ...resultWithoutPassword } = result.toObject();

  return resultWithoutPassword;
};

const getAllUserFromDB = async () => {
  const result = await User.find().select({
    userId: 0,
    password: 0,
    _id: 0,
    isActive: 0,
    hobbies: 0,
    orders: 0,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new CustomError('User not found', 404, 'User not found');
  }
  const result = await User.aggregate([
    { $match: { userId } },
    { $project: { password: 0, _id: 0 } },
  ]);
  return result;
};

const updateSingleUserFromDB = async (userId: number, userData: IUpdateUser) => {
  if (!(await User.isUserExists(userId))) {
    throw new CustomError('User not found', 404, 'User not found');
  }
  const updatedUser = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    select: '-password -_id',
  });
  return updatedUser;
};

const deleteUserFromDB = async (userId: number) => {
  if (!(await User.isUserExists(userId))) {
    throw new CustomError('User not found!', 404, 'User not found!');
  }
  const result = await User.deleteOne({ userId });
  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteUserFromDB,
};
