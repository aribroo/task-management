import supertest from "supertest";
import app from "../src/app.js";
import * as bcrypt from "bcrypt";
import { prismaClient } from "../src/database/db.js";

describe("User API", () => {
  describe("POST /api/users/register", () => {
    it("should success register", async () => {
      const result = await supertest(app).post("/api/users/register").send({
        username: "testing",
        password: "testing",
      });

      expect(result.status).toEqual(201);
      expect(result.body.data).toHaveProperty("username");
      expect(result.body.data.username).toEqual("testing");
    });

    afterEach(async () => {
      await prismaClient.user.delete({ where: { username: "testing" } });
    });
  });

  describe("POST /api/users/login", () => {
    beforeEach(async () => {
      const hashPassword = await bcrypt.hash("testing", 10);

      await prismaClient.user.create({
        data: {
          username: "testing",
          password: hashPassword,
        },
      });
    });

    it("should success login", async () => {
      const result = await supertest(app).post("/api/users/login").send({
        username: "testing",
        password: "testing",
      });

      expect(result.status).toEqual(200);
      expect(result.body.data).toHaveProperty("accessToken");
    });

    it("should throw 401 if not valid", async () => {
      const result = await supertest(app).post("/api/users/login").send({
        username: "",
        password: "",
      });

      expect(result.status).toEqual(401);
      expect(result.body.error).toBeDefined();
    });

    afterEach(async () => {
      await prismaClient.user.delete({ where: { username: "testing" } });
    });
  });
});
