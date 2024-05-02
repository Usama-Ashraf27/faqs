import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/userControllers.js";

//router object
const router = express.Router();

//routes
//register routes
router.post("/register", registerController);

router.post("/login", loginController);

//export
export default router;
