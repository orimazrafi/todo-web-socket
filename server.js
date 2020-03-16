const express = require("express");
const app = express();
const socket = require("socket.io");
app.use(express.static("public"));
const path = require("path");

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`listining on port : ${port}`);
});

const io = socket(server);
io.on("connection", socket => {
  console.log("connected..." + socket.id);
  socket.on("task", task => {
    io.sockets.emit("task", task);
  });
  socket.on("delete", index => {
    io.sockets.emit("delete", index);
  });
});
