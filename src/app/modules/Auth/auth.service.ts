import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/jwtHalpers";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "f1a7e29d3b6c8e1049dce73f20ab5d4222sw2s2s1",
    "5m"
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "f1a7e29d3b6c8e1049dce73f20ab5d4222sw2s2s1",
    "30d"
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      "f1a7e29d3b6c8e1049dce73f20ab5d4222sw2s2s1"
    );
  } catch (err) {
    throw new Error("you are not authorized");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "f1a7e29d3b6c8e1049dce73f20ab5d4222sw2s2s1",
    "5m"
  );

  return {
    accessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const authService = {
  loginUser,
  refreshToken,
};
