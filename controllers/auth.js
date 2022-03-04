import { getReqData } from "../utils/getReqData.js";
import { Users } from "../models/Users.js";

import { userServices } from "../services/users.js";
import { OK } from "../common/http-status.js";

export const handleRegister = async (req, res) => {
  let userData = await getReqData(req);
  userData = await JSON.parse(userData);

  const user = await Users.findOne({ username: userData.username });
  if (user) {
    return res.status(401).send({ message: "This user already exists" });
  }
  const newUser = await userServices.createUser(userData);
  return res.status(OK).send(newUser);
};

export const handleLogin = async (req, res, next) => {
  let userData = await getReqData(req);
  userData = await JSON.parse(userData);
  try {
    const token = await userServices.login(userData);

    return res.status(OK).send({ token });
  } catch (error) {
    return next(error);
  }
};
