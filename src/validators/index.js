import {body} from "express-validator"

const userRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is invalid"),
        body("username")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({min: 3}).withMessage("Username should be atleast 3 char")
            .isLength({max: 13}).withMessage("Username should be not longer than 13 char"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isLength({min: 8}).withMessage("Password should be atleast 8 char")
            .isLength({max: 20}).withMessage("Username should not be longer than 20 char"),
    ]
}

const userLoginValidator = () => {
    [
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