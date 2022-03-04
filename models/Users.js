import mongoose from "mongoose";
import { SHA256 } from "../utils/hash_SHA256.js";

export const hashPassword = async function (next) {
  const password = SHA256(this.password);

  this.password = password;
  next();
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", hashPassword);
export const Users = mongoose.model("users", userSchema);
