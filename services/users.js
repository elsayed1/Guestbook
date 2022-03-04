import { NOT_FOUND, UNAUTHORIZED } from "../common/http-status.js";
import HttpError from "../common/HttpError.js";
import { Users } from "../models/Users.js";
import { SHA256 } from "../utils/hash_SHA256.js";
import { isNil } from "../utils/isNil.js";
import { generateToken } from "../utils/generateToken.js";

export const userServices = {
  async createUser({ username, password }) {
    const user = new Users({
      username,
      password,
    });

    await user.save();

    return user;
  },

  async login({ username, password }) {
    const user = await Users.findOne({ username }).lean();
    if (isNil(user)) {
      throw new HttpError({
        status: NOT_FOUND,
        message: "there is no user with this username",
      });
    }

    const isValidPassword = SHA256(password) === user.password;
    if (!isValidPassword) {
      throw new HttpError({
        status: UNAUTHORIZED,
        message: "Wrong  password",
      });
    }
    const { password: pass, ...userData } = user;
    const token = generateToken(userData);
    return token;
  },
};
