import { Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";

const getAllFromDB = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await adminService.getAllFromDB(filters, options);

    res.status(200).json({
      success: true,
      massage: "admin data fetched ",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      massage: "something went wrong",
      error: err,
    });
  }
};

const getByIdFromDB = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await adminService.getByIdFromDB(id as string);

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
  getByIdFromDB,
};
