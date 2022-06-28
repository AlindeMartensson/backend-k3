//Get all messages, get all rooms, add message,
//add room, all messages in room, delete room + messages

const db = require("../database.js");

function getAllMessaes() {
  const sql = "SELECT * FROM messages";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);
    });
  });
}

function getAllRooms() {
  const sql = "SELECT * FROM rooms";
  return new Promise((resolve, reject) => {
    db.all(sql, (error, rows) => {
      if (error) {
        reject(error);
      }
      resolve(rows);
    });
  });
}

function addMessage(book) {
  const sql =
    "INSERT INTO messages (id, userId, date, message, room) VALUES (?, ?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [book.title, book.author], (error) => {
      if (error) {
        console.error(error.message);

        reject(error);
      }

      resolve("success");
    });
  });
}

function deleteRoom(id) {
  const sql = "DELETE FROM rooms WHERE id = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, id, function (error) {
      if (error) {
        console.log(error.message);
        reject(error);
      }

      resolve("success");
    });
  });
}
