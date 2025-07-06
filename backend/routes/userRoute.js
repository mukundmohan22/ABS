import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", authUser, getUserProfile);

userRouter.post("/update-profile", upload.single("image"), authUser, updateProfile);

userRouter.post("/book-appointment", authUser, bookAppointment);
userRouter.get("/list-appointment", authUser, listAppointment);

export default userRouter;
