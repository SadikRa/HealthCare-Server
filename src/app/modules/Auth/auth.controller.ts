import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { authService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(
  async (req: Request, res: Response) => {

    const result = await authService.loginUser(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "login user done",
      data: result,
    });
  }
);

export const authController = {
  loginUser,
};
