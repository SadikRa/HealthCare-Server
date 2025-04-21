import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import upload from "../../../helpers/fileUploader";

const router = express.Router();

router.post(
  "/",
  auth("ADMIN", "SUPER_ADMIN"),
  upload.single("file"),
  userController.createAdmin
);

export const userRoutes = router;
