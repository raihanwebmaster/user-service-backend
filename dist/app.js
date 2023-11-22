"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = require("./app/modules/user/user.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/users', user_route_1.UserRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Programming Hero level 2 course Assignment 2 , Student: Raihan Uddin, Email: raihanemon2015@gmail.com  ');
});
exports.default = app;
