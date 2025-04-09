import { Request, Response } from "express";
import { UserService } from "./user.service";

const CreateAdmin = async (req: Request, res: Response) => {
  const result = await UserService.CreateAdmin(req.body);
  return res.status(200).json(result);
};

export const UserController = {
  CreateAdmin,
};
