const User = require("../models/user.model");
const ErrorHandler = require("../utils/ErrorHandler");
const bigPromise = require("../utils/bigPromise");
const bcrypt = require("bcrypt");
const cookieToken = require("../utils/cookieToken");


exports.createUser = bigPromise(async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const createdUser = await User.create({ name, email, password });
        res.status(200).send({ createdUser });
    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error.message, 400));
    }
});

exports.loginUser = bigPromise(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const foundUser = await User.findOne({ email });

        const comparePassword = await foundUser.comparePassword(password);

        const token = foundUser.getToken();

        cookieToken(foundUser, 200, token)
    } catch (error) {
        console.error(error);
        next(new ErrorHandler(error.message, 400));
    }
});