import { Admin, PrismaClient, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { IFile } from "../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";

const prisma = new PrismaClient();

const createAdmin = async (req: any) => {
  const file = req.file;

  if (file) {
    const uploadToCloudinary = await fileUploader.uploadToCloudinary(file);
    req.body.data.admin.profilePhoto = uploadToCloudinary?.secure_url as string;
  }
};

export const userService = {
  createAdmin,
};
