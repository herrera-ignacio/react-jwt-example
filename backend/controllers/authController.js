import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { accessTokenSecret, refreshTokenSecret } from "../config/secrets.js";

export const handleAuth = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password are required" });

  // Evaluate username
  const userFound = User.findOne(username);
  if (!userFound) return res.status(401);

  // Evaluate password
  const match = await bcrypt.compare(password, userFound.password);
  if (!match) return res.status(401);

  // Auth success!
  const accessToken = jwt.sign(
    {
      UserInfo: {
        username: userFound.username
        // roles or other info...
      }
    },
    accessTokenSecret,
    { expiresIn: '10s' }
  );

  const refreshToken = jwt.sign(
    { username: userFound.username },
    refreshTokenSecret,
    { expiresIn: '1d' }
  );

  await User.update(username, { refreshToken });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true, // set to false for using Thunder Client in dev
    sameSite: 'None',
    maxAge: 24 * 60 * 60 * 1000 });

  res.json({ accessToken });
}
