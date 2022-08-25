const { Client } = require("pg");

const db = new Client({
  ssl: {
    rejectUnauthorized: false,
  },
  connectionString: process.env.DATABASE_URL,
});

db.connect();

const logMessages = `
    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        userId TEXT,
        date TEXT,
        message TEXT,
        room TEXT
    ) `;

const logRooms = `
    CREATE TABLE IF NOT EXISTS rooms (
        room TEXT,
        id SERIAL PRIMARY KEY
    ) `;

db.query(logMessages, (error) => {
  if (error) {
    console.log(error);
  } else {
  }
});

db.query(logRooms, (error) => {
  if (error) {
    console.log(error);
  } else {
  }
});

module.exports = db;
