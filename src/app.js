import ErrorMiddleware from "./middleware/error-handling.js";
import UserRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import express from "express";

const app = express();
const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.use(UserRouter);
app.use(TaskRouter);

app.use(ErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app