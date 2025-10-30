import { Router } from "express";
import {
  loginUser,
  registerUser,
  logOutUser,
  getUserData,
  getUser,
} from "../Controller/user.controller.js";
import { verifyUser } from "../middleWare/auth.middleware.js";

const router = Router();

router.route("/login").post(verifyUser, loginUser);
router.route("/logout").post(logOutUser);
router.route("/register").post(registerUser);

router.route("/get-current-user").get(verifyUser, getUser);

export default router;
