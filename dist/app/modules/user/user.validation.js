"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const zod_1 = require("zod");
const userFullNameZodSchema = zod_1.z.object({
    firstName: zod_1.z.string().max(20),
    lastName: zod_1.z.string().max(20),
});
const userAddressZodSchema = zod_1.z.object({
    street: zod_1.z.string(),
    city: zod_1.z.string().max(20),
    country: zod_1.z.string().max(20),
});
const orderZodSchema = zod_1.z.object({
    productName: zod_1.z.string().max(25),
    price: zod_1.z.number(),
    quantity: zod_1.z.number(),
});
const userZodSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    username: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: userFullNameZodSchema,
    age: zod_1.z.number(),
    email: zod_1.z.string().email(),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z.array(zod_1.z.string()).refine(hobby => hobby.length >= 2, {
        message: 'At least two hobbies are required',
    }),
    address: userAddressZodSchema,
    orders: zod_1.z.array(orderZodSchema).optional(),
});
exports.UserZodSchema = userZodSchema;
