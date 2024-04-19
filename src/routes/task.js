import TaskController from "../controller/task-controller.js";
import { authMiddleware } from "../middleware/jwt-auth.js";
import express from "express";

class TaskRoute {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.post("/api/tasks", authMiddleware, TaskController.createTask);
    this.router.get("/api/tasks/:taskId", authMiddleware, TaskController.getTask);
    this.router.get("/api/tasks", authMiddleware, TaskController.getAllTask);
    this.router.put("/api/tasks/:taskId", authMiddleware, TaskController.updateTask);
    this.router.delete("/api/tasks/:taskId", authMiddleware, TaskController.deleteTask);
  }
}

export default new TaskRoute().router;
