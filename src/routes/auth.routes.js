import { Router } from "express";
import { registerUser, verifyEmail, resendVerificationEmail } from "../controllers/auth.controllers.js"
import { validate } from "../middlewares/validator.middleware.js"
import {userRegistrationValidator, resendVerificationEmailValidator} from "../validators/index.js"

const router = Router();

router.route("/register").post(userRegistrationValidator(), validate, registerUser);

router.route("/verify/:token/:email").get(verifyEmail);

router.route("/resendVerify").post(resendVerificationEmailValidator(), validate, resendVerificationEmail);

// http://localhost:8000/api/v1/users/verify/${verificationToken}/${email}

export default router;