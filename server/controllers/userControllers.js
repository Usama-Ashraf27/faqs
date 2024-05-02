import userModel from "../Models/userModels.js";
import jwt from "jsonwebtoken";

// Register Controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please enter all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Email already taken",
      });
    }

    const newUser = await userModel.create({
      name,
      email,
      password,
    });

    // Generate JWT token
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.status(200).send({
      success: true,
      message: "Register Success",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error: error.message,
    });
  }
};

//Login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please enter your email and Password",
      });
    }
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res
      .status(200)
      //   .cookie("token", token, {
      //     expires: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000),
      //     secure: process.env.NODE_ENV === "Development" ? true : false,
      //     httpOnly: process.env.NODE_ENV === "Development" ? true : false,
      //     sameSite: process.env.NODE_ENV === "Development" ? true : false,
      //   })
      .send({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "Error in Login Api",
      error,
    });
  }
};
