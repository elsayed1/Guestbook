import { SAULT_KEY } from "../config.js";
import { decode } from "./encryption.js";
import { generateToken } from "./generateToken.js";

export const checkIsValidToken = (token) => {
  const [userData] = token.split(".");

  const user = JSON.parse(decode(SAULT_KEY)(userData));
  return { isValidToken: token === generateToken(user), user };
};
