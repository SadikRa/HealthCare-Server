import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../../helpers/fileUploader";
import { userValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN", "SUPER_ADMIN"),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    userValidation.createAdmin.parse(JSON.parse(req.body.data));

    userController.createAdmin;
  }
);

export const userRoutes = router;
