import { Router } from "express";
import {
  loginUser,
  registerUser,
  logOutUser,
} from "../Controller/user.controller.js";
import { verifyUser } from "../middleWare/auth.middleware.js";

const router = Router();

router.route("/login", verifyUser).post(loginUser);
router.route("/logout").post(logOutUser);
router.route("register").post(registerUser);

export default router;
