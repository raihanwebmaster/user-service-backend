"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const zod_1 = require("zod");
const userFullNameZodSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20).min(1),
    lastName: zod_1.z.string().max(20).min(1),
});
const userAddressZodSchema = zod_1.z.object({
    street: zod_1.z.string().min(1).max(20),
    city: zod_1.z.string().max(20).min(1),
    country: zod_1.z.string().max(20).min(1),
});
const orderZodSchema = zod_1.z.object({
    productName: zod_1.z.string().max(25).min(1),
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().positive(),
});
const userZodSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string().min(1).max(10),
    password: zod_1.z
        .string()
        .min(8)
        .refine((password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,50}$/.test(password), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    }),
    fullName: userFullNameZodSchema,
    age: zod_1.z.number().positive(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()).refine((hobby) => hobby.length >= 2, {
        message: 'At least two hobbies are required',
    }),
    address: userAddressZodSchema,
    orders: zod_1.z.array(orderZodSchema).optional(),
});
const updateUserZodSchema = zod_1.z
    .object({
    username: zod_1.z.string().min(1).max(10),
    password: zod_1.z
        .string()
        .min(8)
        .refine((password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,50}$/.test(password), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    })
        .optional(),
    fullName: userFullNameZodSchema.optional(),
    age: zod_1.z.number().positive().optional(),
    email: zod_1.z.string().email().optional(),
    isActive: zod_1.z.boolean().default(true).optional(),
    hobbies: zod_1.z
        .array(zod_1.z.string())
        .refine((hobby) => hobby.length >= 2, {
        message: 'At least two hobbies are required',
    })
        .optional(),
    address: userAddressZodSchema.optional(),
    orders: zod_1.z.array(orderZodSchema).optional(),
})
    .strict();
exports.UserZodSchema = {
    createUserSchmea: userZodSchema,
    updateUserZodSchema,
    orderZodSchema,
};
