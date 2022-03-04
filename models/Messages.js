import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
  replies: [
    {
      type: mongoose.Types.ObjectId,
      ref: "messages",
    },
  ],
  parentId: {
    type: mongoose.Types.ObjectId,
    ref: "messages",
  },
});

export const Messages = mongoose.model("messages", messageSchema);
