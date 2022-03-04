import mongoose from "mongoose";
import app from "./app.js";

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});

const uri = "mongodb://localhost:27017/guestbook";

mongoose
  .connect(process.env.MONGO_URL || uri)
  .then(() => {
    console.log("Mongoose is running");
  })
  .catch(() => {
    console.log("Failed to start mongoose");
  });

process
  .on("unhandledRejection", (reason, p) => {
    console.error(reason, "Unhandled Rejection at Promise", p);
  })
  .on("uncaughtException", (err) => {
    console.error(err, "Uncaught Exception thrown");
    process.exit(1);
  });
// import { Users } from "./models/Users.js";
// import { handleRegister, handleLogin } from "./controllers/auth.js";
// import "./DB.js";

// const PORT = process.env.PORT || 4000;

// const server = http.createServer(async (req, res) => {
//   switch (req.url) {
//     case "/api/register":
//       return handleRegister(req, res);
//     case "/api/login":
//       return handleLogin(req, res);
//     default:
//   }
//   res.writeHead(404, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ message: "Route not found" }));
// });

// server.listen(PORT, () => {
//   console.log(`server started on port: ${PORT}`);
// });

// // addDoc(users, { userName: "adel", password: "Hello" });
// const cursor = await Users.findOne({ username: "adel" });

// console.log(cursor);
