import { Router } from "express";
import { registerUser, verifyEmail, resendVerificationEmail, loginUser, refreshAccessToken, logoutUser } from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import {userRegistrationValidator, resendVerificationEmailValidator, userLoginValidator} from "../validators/index.js"
import { isLoggedIn } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(userRegistrationValidator(), validate, registerUser);

router.route("/verify/:token/:email").get(verifyEmail);

router.route("/resendVerify").post(resendVerificationEmailValidator(), validate, resendVerificationEmail);

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/logout").get(isLoggedIn, logoutUser);

router.route("/refresh").post(refreshAccessToken);

export default router;