import { UserRole } from "../../../../generated/prisma";

const CreateAdmin = async (data: any) => {
  const userData = {
    email: data.admin.email,
    password: data.password,
    role: UserRole.ADMIN,
  };

  return {
    message: "nah i want to do",
  };
};

export const UserService = {
  CreateAdmin,
};
