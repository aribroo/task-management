import { prismaClient } from "../database/db.js";
import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const user = await prismaClient.user.findFirst({
      where: { token: decodedToken.token }
    });

    if (!user) {
      return res.status(401).json({ errors: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: 'Unauthorized' });
  }
};
