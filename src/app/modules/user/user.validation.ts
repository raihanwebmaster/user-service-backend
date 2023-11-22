import { z } from 'zod';


const userFullNameZodSchema = z.object({
  firstName: z.string().max(20),
  lastName: z.string().max(20),
});


const userAddressZodSchema = z.object({
  street: z.string(),
  city: z.string().max(20),
  country: z.string().max(20),
});


const orderZodSchema = z.object({
  productName: z.string().max(25),
  price: z.number(),
  quantity: z.number(),
});


const userZodSchema = z.object({
  userId: z.number(),
  username: z.string(),
  password: z.string(),
  fullName: userFullNameZodSchema,
  age: z.number(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).refine(hobby => hobby.length >= 2, {
    message: 'At least two hobbies are required',
  }),
  address: userAddressZodSchema,
  orders: z.array(orderZodSchema).optional(),
});

export const UserZodSchema = userZodSchema;