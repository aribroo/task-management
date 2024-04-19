import supertest from "supertest";
import app from "../src/app.js";
import * as bcrypt from "bcrypt";
import { prismaClient } from "../src/database/db.js";

describe("Task API", () => {
  describe("POST /api/tasks", () => {
    beforeEach(async () => {
      await prismaClient.user.create({
        data: {
          username: "testing",
          password: await bcrypt.hash("testing", 10),
        },
      });
    });

    it("should success create new task", async () => {
      const loginResponse = await supertest(app).post("/api/users/login").send({
        username: "testing",
        password: "testing",
      });

      const token = loginResponse.body.data.accessToken;

      const result = await supertest(app)
        .post("/api/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "test title",
          description: "test description",
        });

      expect(result.status).toEqual(201);
      expect(result.body.data).toBeDefined();
    });

    afterEach(async () => {
      await prismaClient.user.delete({ where: { username: "testing" } });
      await prismaClient.task.delete({ where: { title: "test title" } });
    });
  });
});
