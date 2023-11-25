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
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const result = yield user_service_1.UserServices.createUserIntoDB(user);
        res.status(200).json({
            success: true,
            message: 'User created successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User already exists!',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUserFromDB();
        res.status(200).json({
            success: true,
            message: 'Users fetched successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
        });
    }
});
const getSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getSingleUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User fetched successfully!',
            data: result[0],
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User not found',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
const updateSingleUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const userUpdateDetails = req.body;
        const result = yield user_service_1.UserServices.updateSingleUserFromDB(Number(userId), userUpdateDetails);
        res.status(200).json({
            success: true,
            message: 'User updated successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User not found',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        yield user_service_1.UserServices.deleteUserFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'User deleted successfully!',
            data: null,
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User not found',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
const userProductStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const productDetails = req.body;
        yield user_service_1.UserServices.userProductStoreFromDB(Number(userId), productDetails);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: null,
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User not found',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
const getUserOrdersList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orders = yield user_service_1.UserServices.getUserOrdersListFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Order fetched successfully!',
            data: {
                orders,
            },
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User not found',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
const getUserOrdersTotalPrice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const totalPrice = yield user_service_1.UserServices.getUserOrdersTotalPriceFromDB(Number(userId));
        res.status(200).json({
            success: true,
            message: 'Total price calculated successfully!',
            data: {
                totalPrice,
            },
        });
    }
    catch (err) {
        if (err.code === 404) {
            res.status(404).json({
                success: false,
                message: err.message || 'User not found',
                error: {
                    code: err.code,
                    description: err.description,
                },
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: err.message || 'something went wrong',
                error: err,
            });
        }
    }
});
exports.UserControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteUser,
    userProductStore,
    getUserOrdersList,
    getUserOrdersTotalPrice
};
