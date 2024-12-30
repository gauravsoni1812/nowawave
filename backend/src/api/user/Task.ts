import { Router, Request, Response } from "express";
import { prisma } from "../.."; // Ensure this points to your Prisma client instance

const createTask = Router();

createTask.post("/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    const { title, description }: { username: string; title: string; description: string } = req.body;


    // Create the task
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status: "Incomplete", // Default status
        userId, // Assuming tasks are related to users via userId
      },
    });

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the task" });
  }
});

const updateTask = Router();

updateTask.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, status }: { title?: string; description?: string; status?: string } = req.body;

    // Check if task exists
    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    // Update the task
    const updatedTask = await prisma.task.update({
      where: { id: id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(status && { status }),
      },
    });

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating the task" });
  }
});

const deleteTask = Router();

deleteTask.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if task exists
    const task = await prisma.task.findUnique({
      where: { id: id },
    });

    if (!task) {
      res.status(404).json({ error: "Task not found" });
      return;
    }

    // Delete the task
    await prisma.task.delete({
      where: { id: id },
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while deleting the task" });
  }
});

const getAllTasks = Router();


 
getAllTasks.get("/:userId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { status } = req.query;

    // Prepare the base filter
    let filter: { userId: string; status?: string } = { userId };

    // Add status filter if provided and valid
    if (status === 'completed' || status === 'Incomplete') {
      filter.status = status; // Add the status to filter if it's valid
    }

    // Retrieve tasks based on the filter
    const tasks = await prisma.task.findMany({
      where: filter,
    });

    res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while retrieving tasks" });
  }
});



export { createTask, updateTask, deleteTask, getAllTasks };