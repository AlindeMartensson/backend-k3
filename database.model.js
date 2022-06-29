//Get all messages, get all rooms, add message,
//add room, delete room + messages
//all messages in room

const db = require("./database.js");

function getAllMessages(room) {
  const sql = "SELECT * FROM messages WHERE room = ?";
  return new Promise((resolve, reject) => {
    db.all(sql, room, (error, rows) => {
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

function addMessage(message) {
  const sql =
    "INSERT INTO messages (userId, date, message, room) VALUES (?, ?, ?, ?)";

  return new Promise((resolve, reject) => {
    db.run(
      sql,
      [message.userId, message.date, message.message, message.room],
      (error) => {
        if (error) {
          console.error(error.message);

          reject(error);
        }

        resolve("success");
      }
    );
  });
}

function addRoom(room) {
  const sql = "INSERT INTO rooms (room) VALUES (?)";

  return new Promise((resolve, reject) => {
    db.run(sql, [room], (error) => {
      if (error) {
        console.error(error.message);

        reject(error);
      }

      resolve("success");
    });
  });
}

function deleteRoom(room) {
  const sql = "DELETE FROM rooms WHERE room = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, room, function (error) {
      if (error) {
        console.log(error.message);
        reject(error);
      }

      resolve("success");
    });
  });
}

function deleteMessages(room) {
  const sql = "DELETE FROM messages WHERE room = ?";

  return new Promise((resolve, reject) => {
    db.run(sql, room, function (error) {
      if (error) {
        console.log(error.message);
        reject(error);
      }

      resolve("success");
    });
  });
}

module.exports = {
  getAllMessages,
  getAllRooms,
  addMessage,
  addRoom,
  deleteRoom,
  deleteMessages,
};
