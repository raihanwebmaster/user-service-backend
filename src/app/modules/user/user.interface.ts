// import { Model } from 'mongoose';

export  interface IUserFullName {
  firstName: string;
  lastName: string;
}

export interface IUserAddress {
  street: string;
  city: string;
  country: string;
}

export interface IOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface IUser extends Document {
  userId: number,
  username: string;
  password: string;
  fullName: IUserFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: IUserAddress;
  orders?: IOrder[];
}


// export interface UserModel extends Model<IUser> {
//     isUserExists(id: string): Promise<IUser | null>;
//   }