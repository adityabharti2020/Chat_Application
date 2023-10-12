const express = require("express");
const userRouter = require("./router/userRouter");
const chatRouter = require("./router/chatRouter");
const messageRouter = require("./router/messageRouter");
const globalHandler = require("./controller/errorController");
const AppError = require("./util/appError");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// API
app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/messages", messageRouter);

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.get("/", (req, res) => {
  return res.send("Hello from server side");
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!}`, 401));
});

app.use(globalHandler);

module.exports = app;
