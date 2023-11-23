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
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const user_validation_1 = require("./user.validation");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        const zodparseData = user_validation_1.UserZodSchema.parse(user);
        const result = yield user_service_1.UserServices.createUserIntoDB(zodparseData);
        res.status(200).json({
            success: true,
            message: 'Student is create successfully',
            data: result,
        });
    }
    catch (err) {
        console.log(err, 'error');
        res.status(500).json({
            success: false,
            message: 'something went wrong',
            error: err,
        });
    }
});
exports.UserControllers = {
    createUser,
};
