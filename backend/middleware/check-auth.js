const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        // Authorization: 'Bearer TOKEN' => 'Bearer', 'TOKEN'
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            throw new Error("Authentication failed!");
        }

        const decodedToken = jwt.verify(token, "secret_dont_share");

        req.userData = {
            userId: decodedToken.userId,
        };

        next();
    } catch {
        const err = new HttpError("Authentication failed!", 403);
        return next(err);
    }
};
