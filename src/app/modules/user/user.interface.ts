import { Model } from 'mongoose';

export type IUserFullName = {
  firstName: string;
  lastName: string;
};

export type IUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type IOrder = {
  productName: string;
  price: number;
  quantity: number;
};

export type IUser = {
  userId: number;
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IUserAddress;
  orders?: IOrder[];
};

export interface UserModel extends Model<IUser> {
  isUserExists(userId: number, username?: string): Promise<IUser | null>;
}
