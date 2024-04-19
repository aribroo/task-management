import UserRepository from "../repository/user-repository.js";
import { generateAccessToken } from "../utils/token-util.js";
import { ResponseError } from "../error/response-error.js";
import * as bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export class UserService {
  async findById(id) {
    const user = await UserRepository.findById(id);
    return user;
  }

  async register(username, password) {
    const isUserExist = await UserRepository.findOne(username);

    if (isUserExist) throw new ResponseError(400, "username already used!");

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await UserRepository.save(username, hashedPassword);

    return {
      id: result.id,
      username: result.username,
    };
  }

  async login(username, password) {
    const user = await UserRepository.findOne(username);

    if (!user) {
      throw new ResponseError(401, "username or password wrong!");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new ResponseError(401, "username or password wrong!");
    }

    const payload = {
      id: user.id,
      username: user.username,
    };

    const accessToken = generateAccessToken(payload)

    return accessToken;
  }

  async refreshToken(payload) {
    const user = await UserRepository.findById(payload.id);

    if (!user) {
      throw new ResponseError(404, "user not found");
    }

    if (!user["refresh_token"]) {
      throw new ResponseError(401, "Unauthorized");
    }

    return generateAccessToken(payload);
  }

  async logout(id) {
    return UserRepository.deleteTokenById(id);
  }
}

export default new UserService();
