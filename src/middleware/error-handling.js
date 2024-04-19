import { ResponseError } from "../error/response-error.js";

const ErrorMiddleware = (err, _, res, next) => {
  if (!err) {
    next;
  }

  if (err instanceof ResponseError) {
    res.status(err.statusCode).json({
      error: err.message,
    });
  } else {
    console.error(err)
    res.status(500).json({
      data: [],
      errors: "Internal Server Error",
    });
  }
};

export default ErrorMiddleware