import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";

const loginControler = express.Router();

loginControler.post("/", async (req: Request, res: Response) => {});

export default loginControler;
