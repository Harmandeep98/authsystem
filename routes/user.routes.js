const { Router } = require("express");
const { createUser, loginUser } = require("../controllers/userControllers");

const userRouter = Router();

userRouter.get("/users", (req, res) => {
    res.status(200).json({ users: "users" })
});

userRouter.get("/users/:id", (req, res) => {
    res.status(200).json({ users: "users" })
});

userRouter.post("/users/add", createUser);

userRouter.post("/users/login", loginUser);

module.exports = userRouter;