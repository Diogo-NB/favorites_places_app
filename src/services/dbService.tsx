import * as SQLite from "expo-sqlite";

export const db = SQLite.openDatabaseSync("databaseName");

async function init() {
  return db.execAsync(`
    CREATE TABLE IF NOT EXISTS places (
    id INTEGER PRIMARY KEY NOT NULL,
    title TEXT NOT NULL,
    imageUri TEXT NOT NULL,
    address TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL
    );`);
}

export const dbService = {
  db,
  init,
};

export default dbService;
