import { prismaClient } from "../database/db.js";

class UserRepository {
  async save(username, password) {
    const result = await prismaClient.user.create({
      data: {
        username,
        password,
      },
      select: {
        username: true,
      },
    });

    return result;
  }

  async findById(id) {
    const result = await prismaClient.user.findFirst({ where: { id } });

    return result;
  }

  async findOne(username) {
    const user = await prismaClient.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  }
}

export default new UserRepository();
