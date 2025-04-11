import { Request, Response } from "express";
import { adminService } from "./admin.service";

const getAllFromDB = async (req: Request, res: Response) => {
  const result = await adminService.getAllFromDB(req.query);

  res.status(200).json({
    success: true,
    massage: "admin data fetched ",
    data: result,
  });
};

export const adminController = {
  getAllFromDB,
};
