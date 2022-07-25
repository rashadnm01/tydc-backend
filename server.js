//\\//\\//\\//\\//\\//
//     Dependencies     \\
//\\//\\//\\//\\//\\//
require("dotenv").config();
const { PORT, MONGO_URL } = process.env;
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const UsersRouter = require("./routes/users/users");
//\\//\\//\\//\\//\\//
//        MongoDB        \\
//\\//\\//\\//\\//\\//

mongoose.connect(MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .on("open", () => console.log("Connected to mongoose"))
  .on("close", () => console.log("Disconnected from mongoose"))
  .on("error", (error) => console.log(error));

//\\//\\//\\//\\//\\//
//      Middleware      \\
//\\//\\//\\//\\//\\//
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/users", UsersRouter);
//\\//\\//\\//\\//\\//
//       Routing       \\
//\\//\\//\\//\\//\\//
app.get("/", (req, res) => {
  res.json([{ mockData: "information", isJson: true }]);
});
//\\//\\//\\//\\//\\//
//      Listener       \\
//\\//\\//\\//\\//\\//
app.listen(PORT || 3000, () => {
  console.log("App listening on port: " + PORT || 3000);
});
