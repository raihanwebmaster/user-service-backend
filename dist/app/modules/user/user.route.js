"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const user_validationMiddleware_1 = require("./user.validationMiddleware");
const router = express_1.default.Router();
router.post('/', (0, user_validationMiddleware_1.handleZodValidation)(user_validation_1.UserZodSchema.createUserSchmea), user_controller_1.UserControllers.createUser);
router.get('/', user_controller_1.UserControllers.getAllUsers);
router.get('/:userId', user_controller_1.UserControllers.getSingleUser);
router.put('/:userId', (0, user_validationMiddleware_1.handleZodValidation)(user_validation_1.UserZodSchema.updateUserZodSchema), user_controller_1.UserControllers.updateSingleUser);
router.delete('/:userId', user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
