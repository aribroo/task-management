import UserService from "../service/user-service.js";

class UserController {
  async register(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = await UserService.register(username, password);

      res.status(201).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;

      const result = await UserService.login(username, password);

      res.status(200).json({
        data: {
          accessToken: result,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

export default new UserController();
