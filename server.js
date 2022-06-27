const { Server } = require("socket.io");
const io = new Server({
  cors: {
    origin: "*",
  },
});

const rooms = {
  default: {
    name: "Default room",
    state: [],
  },
};

//const date = new Date();

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    const joinedRooms = Array.from(socket.rooms);
    const currentRoom = joinedRooms[1];

    rooms[currentRoom].state.push({
      id: socket.id,
      date: new Date(),
      message: msg,
    });
    io.to(currentRoom).emit("chat message", rooms[currentRoom].state);
  });
  socket.on("ready", () => {
    socket.join("default");
    socket.emit("initial_state", rooms["default"].state);
  });
  socket.on("create_room", (room) => {
    rooms[room] = {
      name: room,
      state: [],
    };

    console.log(rooms);
  });
  socket.on("join_room", (room) => {
    const joinedRooms = Array.from(socket.rooms);
    const roomToLeave = joinedRooms[1];
    socket.leave(roomToLeave);

    socket.join(room);
    console.log(rooms);
    io.to(room).emit("updated_state", rooms[room].state);
    console.log(`${socket.id} joined room: ${room}`);
  });
  // Event: Gå med i rum
  //Event: Gå ur rum
});

io.listen(4000);

console.log("listening on 4000");

// Vilket rum? Gå ut ur rum. Gå med i nytt rum. Skicka meddelande från rätt rum

//
