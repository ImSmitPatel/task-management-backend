import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
    try {
        console.log(req.cookies);
        let token = req.cookies?.refreshToken;

        if(!token) {
            console.log("Token not found");
            return res.status(401).json(new ApiError(401, "Unauthorized"))
        }

        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        console.log("payload", payload);
        req.user = payload;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json(new ApiError(500, "Internal Server Error"))
    }
}

export {isLoggedIn};