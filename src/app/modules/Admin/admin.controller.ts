import { NextFunction, Request, Response } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const getAllFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filters = pick(req.query, adminFilterableField);
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await adminService.getAllFromDB(filters, options);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data fetched",
      meta: result.meta,
      data: result.data,
    });
  } catch (err) {
    next(err);
  }
};

const getByIdFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.getByIdFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data fetched",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const updateIntoDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.updateIntoDB(id, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data updated",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data deleted",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const softDeleteFromDB = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await adminService.softDeleteFromDB(id);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Admin data soft-deleted",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
