const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const aws = require("aws-sdk");
const http = require("http");
require("dotenv").config();

const userRoutes = require("./api/routes/userRoutes");

const app = express();
const server = http.createServer(app);
// const io = require("socket.io")(server, { cors: { origin: "*" } });
// const io1 = require("./utils/socket");

// const wss = new WebSocket.Server({ server: server });

// wss.on("connection", (ws) => {
//   ws.send("Welcome New Client");
//   console.log(ws.);

//   ws.on("message", (message) => {
//     console.log(("Message", message));
//     ws.send(message);
//   });
// });

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const clients = {};

// Using MongoDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connection Failed");
  }
};
connectDb();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.static("public"));

// app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.listen(port, () => console.log(`Server running on port: ${port}`));
