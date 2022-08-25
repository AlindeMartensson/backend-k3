//Get all messages, get all rooms, add message,
//add room, delete room + messages
//all messages in room

const db = require("./database.js");

function getAllMessages(room) {
  const sql = "SELECT * FROM messages WHERE room = ?";

  return db.query(sql, room, function (error, allMessages) {
    if (error) {
      console.error(error.message);
    }
    return allMessages;
  });
}

function getAllRooms() {
  const sql = "SELECT * FROM rooms";

  return db.query(sql, function (error, allRooms) {
    if (error) {
      console.error(error.message);
    }
    return allRooms;
  });
}

function addMessage(message) {
  const sql =
    "INSERT INTO messages (userId, date, message, room) VALUES (?, ?, ?, ?)";

  return db.query(
    sql,
    [message.userId, message.date, message.message, message.room],
    function (error, allMessages) {
      if (error) {
        console.error(error.message);
      }
      return allMessages;
    }
  );
}

function addRoom(room) {
  const sql = "INSERT INTO rooms (room) VALUES (?)";

  return db.query(sql, [room], function (error, allRooms) {
    if (error) {
      console.error(error.message);
    }
    return allRooms;
  });
}

function deleteRoom(room) {
  const sql = "DELETE FROM rooms WHERE room = ?";

  return db.query(sql, room, function (error) {
    if (error) {
      console.error(error.message);
    }
    return;
  });
}

function deleteMessages(room) {
  const sql = "DELETE FROM messages WHERE room = ?";

  return db.query(sql, room, function (error) {
    if (error) {
      console.error(error.message);
    }
    return;
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
