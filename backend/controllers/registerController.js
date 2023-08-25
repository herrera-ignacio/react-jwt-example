import bcrypt from "bcrypt";
import User from "../model/user.js";

export const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are required' });

  // Check for duplicated usernames in the db
  const duplicate = await User.findOne(username);
  if (duplicate) return res.sendStatus(409);

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const userSaved = await User.create({ username, password: hashedPwd });

    res.status(201).json({ "success": `New user ${userSaved} created.` });
  } catch (err) {
    res.status(500).json({ "message": err.message });
  }
}
