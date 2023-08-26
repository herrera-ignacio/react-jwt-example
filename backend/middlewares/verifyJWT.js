import jwt from "jsonwebtoken";
import { accessTokenSecret } from "../config/secrets.js";

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(
      token,
      accessTokenSecret,
      (err, decoded) => {
          if (err) return res.sendStatus(403);
          req.user = decoded.UserInfo.username;
          // req.roles = decoded.UserInfo.roles;
          next();
      }
  );
}

export default verifyJWT;
