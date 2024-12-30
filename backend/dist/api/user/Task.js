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
exports.getAllTasks = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const express_1 = require("express");
const __1 = require("../.."); // Ensure this points to your Prisma client instance
const createTask = (0, express_1.Router)();
exports.createTask = createTask;
createTask.post("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { title, description } = req.body;
        // Create the task
        const task = yield __1.prisma.task.create({
            data: {
                title,
                description,
                status: "Incomplete", // Default status
                userId, // Assuming tasks are related to users via userId
            },
        });
        res.status(201).json({ message: "Task created successfully", task });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the task" });
    }
}));
const updateTask = (0, express_1.Router)();
exports.updateTask = updateTask;
updateTask.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        // Check if task exists
        const task = yield __1.prisma.task.findUnique({
            where: { id: id },
        });
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        // Update the task
        const updatedTask = yield __1.prisma.task.update({
            where: { id: id },
            data: Object.assign(Object.assign(Object.assign({}, (title && { title })), (description && { description })), (status && { status })),
        });
        res.status(200).json({ message: "Task updated successfully", updatedTask });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while updating the task" });
    }
}));
const deleteTask = (0, express_1.Router)();
exports.deleteTask = deleteTask;
deleteTask.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Check if task exists
        const task = yield __1.prisma.task.findUnique({
            where: { id: id },
        });
        if (!task) {
            res.status(404).json({ error: "Task not found" });
            return;
        }
        // Delete the task
        yield __1.prisma.task.delete({
            where: { id: id },
        });
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting the task" });
    }
}));
const getAllTasks = (0, express_1.Router)();
exports.getAllTasks = getAllTasks;
getAllTasks.get("/:userId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const { status } = req.query;
        // Prepare the base filter
        let filter = { userId };
        // Add status filter if provided and valid
        if (status === 'completed' || status === 'Incomplete') {
            filter.status = status; // Add the status to filter if it's valid
        }
        // Retrieve tasks based on the filter
        const tasks = yield __1.prisma.task.findMany({
            where: filter,
        });
        res.status(200).json({ tasks });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while retrieving tasks" });
    }
}));
