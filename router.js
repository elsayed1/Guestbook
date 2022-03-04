import { Router } from "express";
import { authenticate } from "./common/middlewares.js";
import { handleLogin, handleRegister } from "./controllers/auth.js";
import {
  addMessageReply,
  createMessage,
  deleteMessage,
  getMessages,
  updateMessage,
} from "./controllers/messages.js";

const router = new Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);

router.post("/messages/:id", authenticate, addMessageReply);
router.post("/messages", authenticate, createMessage);

router.get("/messages", authenticate, getMessages);
router.delete("/messages/:id", authenticate, deleteMessage);
router.patch("/messages/:id", authenticate, updateMessage);
export default router;
