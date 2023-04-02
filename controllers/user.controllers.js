const User = require("../models/User.model.js");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const { password, userName, email } = req.body;

    const duplicate = await User.findOne({ email }).exec();
    if (duplicate)
      return res.status(409).json({ message: "Duplicate email present" });

    // encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    // create and store the new user
    const result = await User.create({
      password: hashedPwd,
      userName,
      email,
    });

    res.status(201).json({ message: `New user created!`, result: result._id });
  } catch (err) {
    return res.status(500).json({ message: err.message }).end();
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser)
      return res.status(401).json({ message: "User does not exist." }); //Unauthorized

    // evaluate password
    const match = await bcrypt.compare(password, foundUser.password);

    if (match) {
      return res.status(200).json({
        message: "User Verified",
        user: {
          userId: foundUser._id,
          userName: foundUser.userName,
          email: foundUser.email,
        },
      });
    } else {
      return res.status(400).json({ message: "Wrong password." });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message }).end();
  }
};

module.exports = { signUp, login };
