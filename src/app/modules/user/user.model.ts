import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import {
  IOrder,
  IUser,
  IUserAddress,
  IUserFullName,
  UserModel,
  //   UserModel,
} from './user.interface';

const validateHobbiesLength = function (hobbies: string[]) {
  return hobbies.length >= 2;
};

const userFullNameSchema = new Schema<IUserFullName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'First Name can not be more than 20 characters'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    maxlength: [20, 'Last Name can not be more than 20 characters'],
  },
});

const userAddressSchema = new Schema<IUserAddress>({
  street: {
    type: String,
    required: [true, 'street is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'city is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'country is required'],
  },
});

const orderSchema = new Schema<IOrder>({
  productName: {
    type: String,
    maxlength: [25, 'productName can not be more than 25 characters'],
  },
  price: Number,
  quantity: Number,
},{ _id: false });

const userSchema = new Schema<IUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: [true, 'User id  is required'],
  },
  username: {
    type: String,
    unique: true,
    required: [true, 'username is required'],
  },
  password: { type: String, required: [true, 'password is requeired'] },
  fullName: {
    type: userFullNameSchema,
    required: [true, 'Name is required'],
    _id: false,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is requried'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: [true, 'hobbies is required'],
    validate: [validateHobbiesLength, 'At least two hobbies are required'],
  },
  address: {
    type: userAddressSchema,
    required: [true, 'address is required'],
    _id: false 
  },
  orders: {
    type: [orderSchema],
    default: undefined,
  },
});

userSchema.pre('save', async function (next) {
  //hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.statics.isUserExists = async function (
  userId: number,
  username: string
) {
  const existingUser = await User.findOne({ $or: [{ userId }, { username }] });
  return existingUser;
};

export const User = model<IUser, UserModel>('User', userSchema);
