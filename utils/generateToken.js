import { SAULT_KEY, SECRET_KEY } from "../config.js";
import { encode } from "./encryption.js";
import { SHA256 } from "./hash_SHA256.js";

export const generateToken = (data, secret = SECRET_KEY) => {
  const stringifiedData = JSON.stringify(data);

  const checksum = SHA256(`${stringifiedData}${secret}`);
  const token = `${encode(SAULT_KEY)(stringifiedData)}.${checksum}`;
  return token;
};
