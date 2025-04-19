import {body} from "express-validator"

const userRegistrationValidator = () => {
    console.log("userRegistrationValidator run")
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({min: 3}).withMessage("Username should be atleast 3 char"),
        body("fullname")
            .trim()
            .notEmpty().withMessage("Fullname is required"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isLength({min: 6}).withMessage("Password should be atleast 6 char"),
    ]
}

// for custom password strength rules
// body("password")
//     .matches(/[a-z]/).withMessage("Password must contain a lowercase letter")
//     .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter")
//     .matches(/\d/).withMessage("Password must contain a number")
//     .matches(/[@$!%*?&]/).withMessage("Password must contain a special character")

const userLoginValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required"),
        body("password")
            .notEmpty().withMessage("Password is required")
    ]
}

export {userRegistrationValidator, userLoginValidator}