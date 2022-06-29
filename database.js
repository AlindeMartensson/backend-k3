const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db.sqlite", (error) => {
  if (error) {
    console.log("Error");
  }

  const logMessages = `
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId TEXT,
        date TEXT,
        message TEXT,
        room TEXT
    ) `;

  const logRooms = `
    CREATE TABLE IF NOT EXISTS rooms (
        room TEXT,
        id INTEGER PRIMARY KEY AUTOINCREMENT
    ) `;

  db.run(logMessages, (error) => {
    if (error) {
      console.log(error);
    } else {
    }
  });

  db.run(logRooms, (error) => {
    if (error) {
      console.log(error);
    } else {
    }
  });
});

module.exports = db;
