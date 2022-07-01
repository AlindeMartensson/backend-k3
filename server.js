const { Server } = require("socket.io");
const fs = require("fs");
const model = require("./database.model.js");
const io = new Server({
  cors: {
    origin: "*",
  },
});

const rooms = {
  default: {
    name: "default",
    state: [],
  },
};

async function init() {
  const allRooms = await model.getAllRooms();

  for (let room in allRooms) {
    rooms[room.name] = {
      name: room.name,
      state: await model.getAllMessages(room.name),
    };
  }
}

init();

//model.getAllRooms();
//model.getAllMessages();

//const date = new Date();

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    if (msg === "") {
      return;
    }
    const joinedRooms = Array.from(socket.rooms);
    const currentRoom = joinedRooms[1];
    model.addMessage({
      userId: socket.id,
      date: new Date(),
      message: msg,
      room: currentRoom,
    });
    rooms[currentRoom].state.push({
      id: socket.id,
      date: new Date(),
      message: msg,
      room: currentRoom,
    });
    io.to(currentRoom).emit("chat message", rooms[currentRoom].state);
  });
  socket.on("ready", () => {
    socket.join("default");
    socket.emit("initial_state", rooms["default"].state);
  });
  socket.on("create_room", (room) => {
    const roomExists = rooms.hasOwnProperty(room);
    console.log(roomExists);
    if (!roomExists) {
      model.addRoom(room);
      console.log("skapade rum");
      rooms[room] = {
        name: room,
        state: [],
      };
    }

    console.log(rooms);
  });
  socket.on("join_room", (room) => {
    const joinedRooms = Array.from(socket.rooms);
    const roomToLeave = joinedRooms[1];
    socket.leave(roomToLeave);
    socket.room = room;

    socket.join(room);
    console.log(socket.rooms);
    io.to(room).emit("updated_state", rooms[room].state);
    console.log(`${socket.id} joined room: ${room}`);
  });
  socket.on("delete_room", (room) => {
    model.deleteRoom(room);
    model.deleteMessages(room);
    console.log(room);
  });

  socket.use(([event, ...args], next) => {
    if (event === "chat message") {
      const logMessage = {
        id: socket.id,
        room: socket.room,
        date: new Date(),
      };

      fs.writeFile(
        "./log.txt",
        JSON.stringify(logMessage),
        { flag: "a+" },
        (err) => {
          if (err) {
            console.error(err);
          }
        }
      );
    }

    next();
  });
});

io.listen(4000);

console.log("listening on 4000");
