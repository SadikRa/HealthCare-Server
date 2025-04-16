import jwt from "jsonwebtoken";

const generateToken = (
  payload: Record<string, any>,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    algorithm: "HS256",
    expiresIn,
  });
};

export const jwtHelpers = { generateToken };
