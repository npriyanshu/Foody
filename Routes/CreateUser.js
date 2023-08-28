import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
const router = express.Router();
import User from "../model/User.js";
//login route
router.post(
  "/loginuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userdata = await User.findOne({ email: req.body.email });
      if (!userdata) {
        return res
          .status(400)
          .json({ success: false, msg: "enter the correct email" });
      }
      const pwdCompare = await bcrypt.compare(
        req.body.password,
        userdata.password
      );

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ success: false, msg: "Incorrect Password" });
      }
      const data = {
        user:{
          id:userdata.id,
        }
      }
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
      return res.status(200).json({ success: true, msg: "Login successful",authToken});
    } catch (error) {
      console.log(error);
    }
  }
);

//create user route
router.post(
  "/createuser",
  [
    body("email", "Incorrect Email").isEmail(),
    body("name").isLength({ min: 5 }),
    body("password", "Incorrect Password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //validate first
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "User already exist" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpassword = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secpassword,
        email: req.body.email,
        location: req.body.location,
      });
      console.log(user)
      res.status(201).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
