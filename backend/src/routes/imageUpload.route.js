import { Router } from "express";
import { uploadImage } from "../Controller/imageUplaod.controller.js";
import { upload } from "../middleWare/multer.middleware.js";

const router = Router();

router.post("/upload/:id", upload.single("image"), uploadImage);

export default router;
