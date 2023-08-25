import db from "./db.js";
import { v4 as uuidv4 } from 'uuid';

const { users } = db.data;

const UserModel = {
  findOne(username) {
    const user = users.find(u => u.username === username);
    return user;
  },

  async create(userData) {
    const user = {
      id: uuidv4(),
      ...userData
    }
    users.push(user);
    await db.write();
    return user;
  },

  async update(username, userData) {
    const userIdx = users.findIndex(u => u.username === username);
    users[userIdx] = { ...users[userIdx], ...userData};
    await db.write();
    return users[userIdx];
  }
}

export default UserModel;
