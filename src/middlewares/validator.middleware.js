import {validationResult} from "express-validator"
import {ApiError} from "../utils/api-error.js"

export const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        return res.status(422)
            .json(new ApiError(422, "Recieved data is not valid", errors.array()))
    }

    console.log("validator middleware")

    next();
}