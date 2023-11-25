import { z } from 'zod';

const userFullNameZodSchema = z.object({
  firstName: z.string().max(20).min(1),
  lastName: z.string().max(20).min(1),
});

const userAddressZodSchema = z.object({
  street: z.string().min(1).max(20),
  city: z.string().max(20).min(1),
  country: z.string().max(20).min(1),
});

const orderZodSchema = z.object({
  productName: z.string().max(25).min(1),
  price: z.number().positive(),
  quantity: z.number().positive(),
});

const userZodSchema = z.object({
  userId: z.number(),
  username: z.string().min(1).max(10),
  password: z
    .string()
    .min(8)
    .refine(
      (password) =>
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,50}$/.test(
          password,
        ),
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
      },
    ),
  fullName: userFullNameZodSchema,
  age: z.number().positive(),
  email: z.string().email(),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string()).refine((hobby) => hobby.length >= 2, {
    message: 'At least two hobbies are required',
  }),
  address: userAddressZodSchema,
  orders: z.array(orderZodSchema).optional(),
});

const updateUserZodSchema = z
  .object({
    username: z.string().min(1).max(10),
    password: z
      .string()
      .min(8)
      .refine(
        (password) =>
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,50}$/.test(
            password,
          ),
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
        },
      )
      .optional(),
    fullName: userFullNameZodSchema.optional(),
    age: z.number().positive().optional(),
    email: z.string().email().optional(),
    isActive: z.boolean().default(true).optional(),
    hobbies: z
      .array(z.string())
      .refine((hobby) => hobby.length >= 2, {
        message: 'At least two hobbies are required',
      })
      .optional(),
    address: userAddressZodSchema.optional(),
  })
  .strict();

export const UserZodSchema = {
  createUserSchmea: userZodSchema,
  updateUserZodSchema,
  orderZodSchema,
};
