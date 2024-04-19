import UserController from "../controller/user-controller.js";
import express from "express";

class UserRoute {
  constructor() {
    this.router = express.Router();
    this.routes();
  }

  routes() {
    this.router.post("/api/users/register", UserController.register);
    this.router.post("/api/users/login", UserController.login);
  }
}

export default new UserRoute().router;
