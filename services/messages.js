import { NOT_FOUND } from "../common/http-status.js";
import HttpError from "../common/HttpError.js";
import { Messages } from "../models/Messages.js";
import { isNil } from "../utils/isNil.js";

export const messageServices = {
  async createMessage({ message, userId, parentId = null }) {
    const newMessage = new Messages({
      message,
      userId,
      parentId,
    });
    await newMessage.save();
    return newMessage;
  },

  async deleteMessage({ messageId }, { callerId }) {
    const message = await Messages.findOne({
      _id: messageId,
      userId: callerId,
    });

    if (isNil(message)) {
      throw new HttpError({
        status: NOT_FOUND,
        message: "you can't delete this message'",
      });
    }

    await Promise.all([
      Messages.deleteMany({ _id: { $in: message.replies } }),
      Messages.updateOne(
        { replies: messageId },
        { $pull: { replies: messageId } }
      ),
      message.remove(),
    ]);
  },

  async updateMessage({ messageId, message: newMessage }, { callerId }) {
    const message = await Messages.findOne({
      _id: messageId,
      userId: callerId,
    });

    if (isNil(message)) {
      throw new HttpError({
        status: NOT_FOUND,
        message: "you can't update this message",
      });
    }

    if (!isNil(newMessage)) message.message = newMessage;

    await message.save();
    return message;
  },

  async getMessages() {
    let messages = await Messages.find({ parentId: null })
      .populate("userId")
      .populate({
        path: "replies",
        populate: { path: "userId" },
      })
      .lean();

    messages = messages.map(({ userId, replies, ...message }) => ({
      ...message,
      user: userId,
      replies: replies.map(({ userId, ...message }) => ({
        ...message,
        user: userId,
      })),
    }));

    return messages;
  },
};
