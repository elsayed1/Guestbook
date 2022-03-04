import { getReqData } from "../utils/getReqData.js";

import {
  CREATED,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_ENTITY,
} from "../common/http-status.js";
import { messageServices } from "../services/messages.js";
import { Messages } from "../models/Messages.js";
import HttpError from "../common/HttpError.js";
import { isNil } from "../utils/isNil.js";

export const createMessage = async (req, res, next) => {
  let messageData = await getReqData(req);
  messageData = await JSON.parse(messageData);

  const message = await messageServices.createMessage({
    message: messageData.message,
    userId: req.user._id,
  });
  res.status(CREATED).send(message);
};

export const deleteMessage = async (req, res, next) => {
  const {
    user: { _id: userId },
    params: { id: messageId },
  } = req;

  try {
    const message = await messageServices.deleteMessage(
      { messageId },
      { callerId: userId }
    );

    return res.status(OK).send(message);
  } catch (error) {
    return next(error);
  }
};

export const updateMessage = async (req, res, next) => {
  let data = await getReqData(req);
  data = await JSON.parse(data);
  const {
    user: { _id: userId },
    params: { id: messageId },
  } = req;

  try {
    const message = await messageServices.updateMessage(
      { messageId, message: data.message },
      { callerId: userId }
    );

    return res.status(OK).send(message);
  } catch (error) {
    return next(error);
  }
};

export const addMessageReply = async (req, res, next) => {
  let data = await getReqData(req);
  data = await JSON.parse(data);
  const {
    user: { _id: userId },
    params: { id: messageId },
  } = req;
  try {
    const message = await Messages.findOne({ _id: messageId });
    if (isNil(message)) {
      throw new HttpError({
        status: NOT_FOUND,
        message: "Message not found",
      });
    }
    if (!isNil(message.parentId)) {
      throw new HttpError({
        status: UNPROCESSABLE_ENTITY,
        message: "you can't reply to nested message",
      });
    }
    const newMessage = await messageServices.createMessage({
      message: data.message,
      userId: userId,
      parentId: messageId,
    });

    await Messages.updateOne(
      { _id: messageId },
      { $push: { replies: newMessage._id } }
    );
    res.status(CREATED).send(newMessage);
  } catch (error) {
    return next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const messages = await messageServices.getMessages();
    res.status(CREATED).send(messages);
  } catch (error) {
    return next(error);
  }
};
