import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req as any);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin Created successfully!",
    data: result,
  });
});

export const userController = {
  createAdmin,
};
