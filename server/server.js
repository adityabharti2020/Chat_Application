const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config({ path: "./config.env" });
const app = require("./app");

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Database connected..");
  })
  .catch((err) => console.log(err.message));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected with socket.io");
  //   socket.on("joined", ({ user }) => {
  //     users[(socket, id)] = user;
  //     console.log(`${user} has joined`);
  //     socket.broadcast.emit("userJoined", {
  //       user: "Admin",
  //       message: `${users[socket.id]} has joined`,
  //     });
});

//   socket.emit("Welcome", { user: "Admin", message: "Welcome to the chat" });
// });
