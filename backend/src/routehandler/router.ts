import { Router } from "express";
import signinDetails from "../api/auth/signIn";
import signupDetails from "../api/auth/signup";
import { createTask, deleteTask, getAllTasks, updateTask } from "../api/user/Task";


const userRouter = Router();

// Set up routes correctly
userRouter.use("/signin", signinDetails); // Will match POST /signin
userRouter.use("/signup", signupDetails); // Will match POST /signup
 

userRouter.use("/createtask", createTask)

userRouter.use("/updatetask", updateTask)
userRouter.use("/deletetask", deleteTask)
userRouter.use("/getAlltasks", getAllTasks)

// You can add more routes here as needed

export default userRouter;
