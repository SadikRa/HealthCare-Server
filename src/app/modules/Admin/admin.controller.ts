import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, [
      "name",
      "email",
      "searchTerm",
      "contactNumber",
    ]);

    const result = await adminService.getAllFromDB(filters);

    res.status(200).json({
      success: true,
      massage: "admin data fetched ",
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

export const adminController = {
  getAllFromDB,
};
