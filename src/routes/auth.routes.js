import { Router } from "express";
import { registerUser, verifyEmail, resendVerificationEmail, loginUser, refreshAccessToken } from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import {userRegistrationValidator, resendVerificationEmailValidator, userLoginValidator} from "../validators/index.js"

const router = Router();

router.route("/register").post(userRegistrationValidator(), validate, registerUser);

router.route("/verify/:token/:email").get(verifyEmail);

router.route("/resendVerify").post(resendVerificationEmailValidator(), validate, resendVerificationEmail);
// http://localhost:8000/api/v1/users/verify/${verificationToken}/${email}

router.route("/login").post(userLoginValidator(), validate, loginUser);

router.route("/refresh").post(refreshAccessToken);

export default router;