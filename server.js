require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    // connect to the database
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("MongoDB connected"))
      .catch((error) => console.log(error));
    app.listen(process.env.PORT, () => {
      console.log(`Server started on http://localhost:${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

startServer();
