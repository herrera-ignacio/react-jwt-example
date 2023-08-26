import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { accessTokenSecret, refreshTokenSecret } from "../config/secrets.js";

export const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  const refreshToken = cookies?.refresh_token;
  if (!refreshToken) return res.sendStatus(401);

  // Verify JWT
  jwt.verify(
    refreshToken,
    refreshTokenSecret,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      
      const userFound = User.findOne(decoded.username);
      if(!userFound) return res.sendStatus(403);

      // Provide new access token
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username
            // roles or other info...
          }
        },
        accessTokenSecret,
        { expiresIn: '10s' }
      );

      res.json({ accessToken });
    });
}
