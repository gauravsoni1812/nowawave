import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../..";
  
const signinDetails = Router();

signinDetails.post("/", async (req: Request, res: Response): Promise<void> => {
  const { username ,  password }: { username : string; password: string } =
    req.body;
  try {
    const user = (await prisma.user.findUnique({
      where: { username },
    }))  
    if (!user) {
      res.status(404).send({ error: "Email not found" });
      return;
    }
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(401).send({ error: "Password does not match" });
      return;
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.SECRET_KEY as string,
      { expiresIn: "24h" }
    );

    res.status(200).send({
      msg: "Login Successful",
      userName: user.id ,
      token,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
    return;
  }
});

export default signinDetails;
