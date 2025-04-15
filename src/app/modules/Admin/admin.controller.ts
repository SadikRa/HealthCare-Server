import { RequestHandler } from "express";
import { adminService } from "./admin.service";
import pick from "../../../shared/pick";
import { adminFilterableField } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import catchAsync from "../../../shared/catchAsync";

const getAllFromDB: RequestHandler = catchAsync(async (req, res) => {
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
});

const getByIdFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.getByIdFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data fetched",
    data: result,
  });
});

const updateIntoDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.updateIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data updated",
    data: result,
  });
});

const deleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.deleteFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data deleted",
    data: result,
  });
});

const softDeleteFromDB: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await adminService.softDeleteFromDB(id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin data soft-deleted",
    data: result,
  });
});

export const adminController = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
