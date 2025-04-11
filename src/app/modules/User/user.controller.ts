import { Request, Response } from "express";
import { userService } from "./user.service";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.createAdmin(req.body);

    res.status(200).json({
      success: true,
      massage: "admin created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: "something went wrong",
      error: err,
    });
  }
};

export const userController = {
  createAdmin,
};
