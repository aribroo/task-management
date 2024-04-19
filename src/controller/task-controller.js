import TaskService from "../service/task-service.js";

class TaskController {
  async createTask(req, res, next) {
    try {
      const user = req.user;
      const { title, description } = req.body;

      const result = await TaskService.create(user.id, title, description);

      res.status(201).json({
        data: { result },
      });
    } catch (e) {
      next(e);
    }
  }

  async getAllTask(_, res, next) {
    try {
      const result = await TaskService.getAll();

      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async getTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      console.log(taskId);

      const result = await TaskService.getOne(taskId);

      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async updateTask(req, res, next) {
    try {
      const taskId = req.params.taskId;
      const { title, description } = req.body;

      const result = await TaskService.update(taskId, title, description);

      res.status(200).json({
        data: result,
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteTask(req, res, next) {
    try {
      const taskId = req.params.taskId;

     await TaskService.remove(taskId);

      res.status(200).json({ data: "task deleted successfully" });
    } catch (e) {
      next(e);
    }
  }
}

export default new TaskController();
