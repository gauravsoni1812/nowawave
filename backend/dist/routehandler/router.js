"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signIn_1 = __importDefault(require("../api/auth/signIn"));
const signup_1 = __importDefault(require("../api/auth/signup"));
const Task_1 = require("../api/user/Task");
const userRouter = (0, express_1.Router)();
// Set up routes correctly
userRouter.use("/signin", signIn_1.default); // Will match POST /signin
userRouter.use("/signup", signup_1.default); // Will match POST /signup
userRouter.use("/createtask", Task_1.createTask);
userRouter.use("/updatetask", Task_1.updateTask);
userRouter.use("/deletetask", Task_1.deleteTask);
userRouter.use("/getAlltasks", Task_1.getAllTasks);
// You can add more routes here as needed
exports.default = userRouter;
