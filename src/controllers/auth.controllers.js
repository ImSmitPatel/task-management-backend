import {asyncHandler} from "../utils/async-handler.js";
import {User} from "../models/user.models.js";
import {ApiError} from "../utils/api-error.js";
import {ApiResponse} from "../utils/api-response.js";
import {sendMail, emailVerificationMailGenContent} from "../utils/mail.js";
import crypto from "crypto";


const registerUser = asyncHandler(async (req, res) => {
    
    // get user data
    const {email, username, fullname, password} = req.body;

    console.log(email, username, fullname, password);
    

    // validation
    // Used middleware for validation
     
    // check if user email exists
    const existingUser = await User.findOne({email: email})
    
    if(existingUser){
        const err = new ApiError(400,"User already exists", [{email: "User already exists"}]);

        return res.status(400).json({
            statusCode: err.statusCode,
            success: err.success,
            message: err.message,
            errors: err.errors
        });
    }
    // create user
    const user = await User.create({
        username,
        email,
        fullname,
        password,
    })

    // create verification token
    const {hashedToken, unHashedToken, tokenExpiry} = user.generateTemporaryToken();
    console.log(hashedToken, unHashedToken, tokenExpiry);
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;
    const verificationToken = unHashedToken;
    
    // save user
    await user.save()

    // send verification email
    const verificationUrl = `http://localhost:8000/api/v1/auth/verify/${verificationToken}/${email}`;

    console.log(verificationUrl);

    await sendMail({
        email,
        subject: "Verification Email",
        mailGenContent: emailVerificationMailGenContent(username, verificationUrl)
    })

    // send success response
    return res.status(201).json(new ApiResponse(201, { username: username, email: email }, "Registration successful. Please check your email."));

});

const verifyEmail = asyncHandler(async (req, res) => {
    const { token, email } = req.params;
    console.log("Token:", token);
    console.log("Email:", email);

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    
    const user = await User.findOne({
        email: email,
        emailVerificationToken: hashedToken,
        emailVerificationExpiry: { $gt: Date.now() },       // $gt this is query for greater than
    })

    if(!user) {
        return res.status(400).json(new ApiError(400, "Valid User not found"))
    }

    user.isEmailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpiry = undefined;

    await user.save();

    return res.status(201).json(new ApiResponse(200, {}, "User Verified"))
});

const loginUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;
});

const logoutUser = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;
});

const resendVerificationEmail = asyncHandler(async (req, res) => {
    const {email, username, oldVerificationToken} = req.body;

    const oldToken = crypto.createHash("sha256").update(oldVerificationToken).digest("hex");

    const user = await User.findOne({
        email: email,
        username: username,
        emailVerificationToken: oldToken,
    })

    if(!user) {
        throw new ApiError(400, "Valid User not found")
    }

    // create verification token
    const {hashedToken, unHashedToken, tokenExpiry} = user.generateTemporaryToken();
    console.log(hashedToken, unHashedToken, tokenExpiry);
    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpiry = tokenExpiry;

    // save user
    await user.save()

    // send verification email
    const verificationUrl = `http://localhost:8000/api/v1/auth/verify/${unHashedToken}/${email}`;

    console.log(verificationUrl);

    await sendMail({
        email,
        subject: "Verification Email",
        mailGenContent: emailVerificationMailGenContent(username, verificationUrl)
    })

    // send success response
    return res.status(201).json(new ApiResponse(201, { username: username, email: email }, "Verification token re-sent successfully. Please check your email."));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;
});

const forgotPasswordRequest = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body; 
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;
});

const getProfile = asyncHandler(async (req, res) => {
    const {email, username, password, role} = req.body;
});

export { registerUser, verifyEmail, resendVerificationEmail }