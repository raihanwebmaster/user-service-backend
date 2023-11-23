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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    //static method
    // if (await User.isUserExists(userData.userId)) {
    //   throw new Error('User already exists!!');
    // }
    // const result = await User.create(userData);
    //instance method
    const student = new user_model_1.User(userData); // create an instance
    if (yield user_model_1.User.isUserExists(userData.userId)) {
        throw new Error("User already exists");
    }
    const result = yield student.save(); // built in instance method
    return result;
});
exports.UserServices = {
    createUserIntoDB,
};
