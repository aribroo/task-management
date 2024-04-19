import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { prismaClient } from "../database/db.js";

class TaskRepository {
  async save(userId, title, description) {
    const result = await prismaClient.task.create({
      data: {
        user_id: userId,
        title,
        description,
      },
    });

    return result;
  }

  async getAll() {
    const result = await prismaClient.task.findMany({
      select: { title: true, description: true },
    });

    return result;
  }

  async getOne(taskId) {
    const result = await prismaClient.task.findFirst({
      where: { id: Number(taskId) },
      select: { id: true, title: true, description: true },
    });

    return result;
  }

  async updateById(taskId, title, description) {
    try {
      const result = await prismaClient.task.update({
        where: { id: Number(taskId) },
        data: {
          title,
          description,
        },
      });

      return result;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return null;
        }
      }
    }
  }

  async remove(taskId) {
    try {
      const result = await prismaClient.task.delete({
        where: {
          id: Number(taskId),
        },
      });

      return result;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          return null;
        }
      }
    }
  }
}

export default new TaskRepository();
