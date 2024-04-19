import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};
