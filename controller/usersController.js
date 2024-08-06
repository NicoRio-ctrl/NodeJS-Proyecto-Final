import { User } from "../model/mongoDB/user.js";
import bcrypt from "bcrypt";
import { token } from "../service/jwt.js";

const saltRounds = 10;

export const userController = {
  async registerUser(req, res) {
    const { fullName, email, admin } = req.body;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = { fullName, email, password, admin };
    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      res
        .status(201)
        .json({ success: true, message: "User registered", data: savedUser });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Internal Error: " + err.message });
    }
  },

  async loginUser(req, res) {
    const user = await User.find().where({ email: req.body.email });
    if (!user.length) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Email or Password" });
    }

    const hashedPassword = user[0].password;
    const match = await bcrypt.compare(req.body.password, hashedPassword);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect Email or Password" });
    }

    const accessToken = await token.generate(user[0]);
    res
      .status(200)
      .json({ success: true, message: "User logged in", data: accessToken });
  },

  async changeUser(req, res) {
    try {
      const userId = req.params.id;
      const userData = await User.findById(userId);

      if (!userData) return res.status(404).json({ success: false, message: "User not found" });

      userData.admin = !userData.admin;
      const updatedUser = await userData.save();

      res.status(200).json({
        success: true,
        message: "User updated successfully",
        userData: updatedUser,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const userCollection = await User.find();
      if (userCollection && userCollection.length > 0) {
        res.status(200).json({
          success: true,
          message: "List of users",
          data: userCollection,
        });
      } else {
        res.status(404).json({ success: false, message: "Users database empty" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const userId = req.params.id;
      const userData = await User.findById(userId);
  
      if (!userData) return res.status(404).json({ success: false, message: "User not found" });
  
      if (userData) return res.status(200).json({ success: true, message: `User found: ${userData}` });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const userId = req.params.id;
      const deletedUser = await User.findByIdAndDelete(userId);
    
      if (!deletedUser){
        return res.status(200).json({ success: true, message: "User not found"});
      }

      res.status(200).json({ success: true, message: `User deleted: ${deletedUser}` });

    } catch (err) {
      res.status(308).json({ success: false, message: err.message });
    }
  },
};