const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const { connection } = require("./database/db");
const { auth } = require("./middleware/auth");
const { BlogModel } = require("./model/blog.model");
const { Usermodel } = require("./model/user.model");
const { blogsRoute } = require("./routes/blogRoutes");
const { userRoute } = require("./routes/userRoute");
const { tracker } = require("./middleware/tracker");
const app = express();
const morgan = require("morgan");
app.use(express.json());
app.use(cors());
app.use(tracker);
app.use("/user", userRoute);
app.use(auth);
app.use("/articles", blogsRoute);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(" connected to db");
  } catch (error) {
    console.log(error);
    console.log("Not connected to db");
  }
  console.log("server at port 4040");
});
module.exports = app;
