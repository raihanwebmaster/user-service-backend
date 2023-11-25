"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const CustomError_1 = require("../../CustomError");
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield user_model_1.User.isUserExists(userData.userId, userData.username)) {
        throw new CustomError_1.CustomError('User already exists!', 404, 'User already exists!');
    }
    const result = yield user_model_1.User.create(userData);
    const _a = result.toObject(), { password, _id } = _a, resultWithoutPassword = __rest(_a, ["password", "_id"]);
    return resultWithoutPassword;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().select({
        userId: 0,
        password: 0,
        _id: 0,
        isActive: 0,
        hobbies: 0,
        orders: 0,
    });
    return result;
});
const getSingleUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new CustomError_1.CustomError('User not found', 404, 'User not found');
    }
    const result = yield user_model_1.User.aggregate([
        { $match: { userId } },
        { $project: { password: 0, _id: 0 } },
    ]);
    return result;
});
const updateSingleUserFromDB = (userId, userData) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new CustomError_1.CustomError('User not found', 404, 'User not found');
    }
    if (userData.password) {
        userData.password = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_rounds));
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ userId }, userData, {
        new: true,
        select: '-password -_id',
    });
    return updatedUser;
});
const deleteUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new CustomError_1.CustomError('User not found!', 404, 'User not found!');
    }
    const result = yield user_model_1.User.deleteOne({ userId });
    return result;
});
const userProductStoreFromDB = (userId, product) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new CustomError_1.CustomError('User not found!', 404, 'User not found!');
    }
    const updatedUser = yield user_model_1.User.findOneAndUpdate({ userId }, { $push: { orders: product } }, { new: true });
    return updatedUser;
});
const getUserOrdersListFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new CustomError_1.CustomError('User not found!', 404, 'User not found!');
    }
    const userOrders = yield user_model_1.User.aggregate([
        { $match: { userId } },
        { $project: { orders: 1 } },
    ]);
    return userOrders[0].orders;
});
const getUserOrdersTotalPriceFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(yield user_model_1.User.isUserExists(userId))) {
        throw new CustomError_1.CustomError('User not found!', 404, 'User not found!');
    }
    const userOrders = yield user_model_1.User.aggregate([
        { $match: { userId } },
        { $unwind: '$orders' },
        {
            $group: {
                _id: null,
                total: { $sum: '$orders.price' },
            },
        },
        { $project: { total: 1 } },
    ]);
    return userOrders[0].total;
});
exports.UserServices = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateSingleUserFromDB,
    deleteUserFromDB,
    userProductStoreFromDB,
    getUserOrdersListFromDB,
    getUserOrdersTotalPriceFromDB,
};
