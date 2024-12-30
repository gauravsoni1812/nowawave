import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../..";

const signupDetails = Router();

signupDetails.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(req.body);  

    const { username , password }: { username : string; password: string} = req.body;

    // Check if userName already exists (ensure userName is unique in your schema)
    const existUser = await prisma.user.findUnique({
      where: { username }, // This will now work because userName is unique
    });

    if (existUser) {
      res.status(400).json({ error: "Please use a unique username" });
      return
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      try {
        const response = await prisma.user.create({
          data: {
            username:username,
            password: hashedPassword,
          }
        });
     
        console.log(response)
        res.status(200).json({ msg: `Welcome to Nowawave` });
        return 
      } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, error });
        return 
      }
    } else {
      res.status(400).json({ error: "Password is required" });
      return 
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
    return 
  }
});

export default signupDetails;
