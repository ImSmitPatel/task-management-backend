import {ApiResponse} from "../utils/api-response.js";

const healthCheck = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running",
    })

    res.status(200).json(
        new ApiResponse(200, { success: true, message: "Server is running"}, "Server is running")
    )
}

export {healthCheck}