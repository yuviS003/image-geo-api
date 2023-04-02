require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user.routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
  try {
    // connect to the database
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.log(error));
  } catch (e) {
    console.log(e);
  }
});
