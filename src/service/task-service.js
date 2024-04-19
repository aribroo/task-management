import TaskRepository from "../repository/task-repository.js";
import { ResponseError } from "../error/response-error.js";

class TaskService {
  async create(userId, title, description) {
    const result = await TaskRepository.save(userId, title, description);

    return result;
  }

  async getAll() {
    const tasks = await TaskRepository.getAll();

    return tasks;
  }

  async getOne(taskId) {
    const task = await TaskRepository.getOne(taskId);

    if (!task) throw new ResponseError(404, "task not found");

    return task;
  }

  async update(taskId, title, description) {
    const task = await TaskRepository.updateById(taskId, title, description);

    if (!task) throw new ResponseError(404, "task not found");

    return task;
  }

  async remove(taskId) {
    const task = await TaskRepository.remove(taskId);

    if (!task) throw new ResponseError(404, "task not found");

    return task;
  }
}

export default new TaskService();
