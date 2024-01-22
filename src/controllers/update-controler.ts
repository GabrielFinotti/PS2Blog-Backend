import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userModel from "../models/user-model";

const updateControler = express.Router();

updateControler.put("/:id", async (req: Request, res: Response) => {});

export default updateControler;
