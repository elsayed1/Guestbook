import { INTERNAL_SERVER_ERROR } from "./http-status.js";

class HttpError extends Error {
  constructor({ message, status = INTERNAL_SERVER_ERROR, meta = {} } = {}) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.meta = meta;
  }
}

export default HttpError;
