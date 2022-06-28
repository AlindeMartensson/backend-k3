const { Server } = require("socket.io");
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

//const date = new Date();

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    if (msg === "") {
      return;
    }
    const joinedRooms = Array.from(socket.rooms);
    const currentRoom = joinedRooms[1];

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

    socket.join(room);
    console.log(socket.rooms);
    io.to(room).emit("updated_state", rooms[room].state);
    console.log(`${socket.id} joined room: ${room}`);

    socket.on("delete_room", (room) => {
      console.log(rooms);
    });
  });
  // Event: Gå med i rum
  //Event: Gå ur rum
});

io.listen(4000);

console.log("listening on 4000");

// Vilket rum? Gå ut ur rum. Gå med i nytt rum. Skicka meddelande från rätt rum

//
