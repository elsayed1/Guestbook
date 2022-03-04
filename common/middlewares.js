import { Users } from "../models/Users.js";
import { checkIsValidToken } from "../utils/checkIsValidToken.js";
import { isNil } from "../utils/isNil.js";
import { INTERNAL_SERVER_ERROR, UNAUTHORIZED } from "./http-status.js";
import HttpError from "./HttpError.js";

export const errorHandler = (error, req, res, next) => {
  const response = {
    status: INTERNAL_SERVER_ERROR,
    meta: { error },
    message: "Something Went Wrong",
  };

  if (!isNil(error.status)) {
    response.status = error.status;
  }

  if (!isNil(error.message)) {
    response.message = error.message;
  }

  if (!isNil(error.meta)) {
    response.meta = error.meta;
  }

  console.error(error);
  return res.status(response.status).json(response);
};

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("JWT ", "");
    const { isValidToken, user } = checkIsValidToken(token);
    const activeUser = await Users.findOne({ username: user.username }).lean();

    if (isNil(activeUser) || !isValidToken) {
      throw new HttpError({ status: UNAUTHORIZED, message: "Invalid jwt" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(UNAUTHORIZED).send("Invalid jwt");
  }
};
