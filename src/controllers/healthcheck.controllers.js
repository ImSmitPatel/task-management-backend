import {ApiResponse} from "../utils/api-response.js";

const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    })
}

export {healthCheck}