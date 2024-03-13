const userModel = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const bigPromise = require("../utils/bigPromise");
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = bigPromise(async (req, res, next) => {
    const token =
        req.cookies?.token ||
        req.header("Authorization")?.replace("Bearer ", "") ||
        req.body?.token;

    if (!token) {
        return next(new ErrorHandler("Please login first", 401));
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decodedToken.id);
    next();
});