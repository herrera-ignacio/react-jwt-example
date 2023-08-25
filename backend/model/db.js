import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";

// db.json file
const __dirname = dirname(fileURLToPath(import.meta.url));
const file = join(__dirname, 'db.json');

// lowdb configuration
const adapter = new JSONFile(file);
const defaultData = { users: [{ username: "test" }] };
const db = new Low(adapter, defaultData);
await db.read();

export default db;
