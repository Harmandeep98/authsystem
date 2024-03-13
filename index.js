const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/db.js");
const userRouter = require("./routes/user.routes.js");
const { isAuthenticatedUser } = require("./middlewares/auth.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
connectDb();

app.use(userRouter);

app.get("/restrictedtologing", isAuthenticatedUser, (req, res) => {
    res.json({ success: "restrictedtologing" });
});

app.get("/health", (req, res) => {
    res.json({ health: "running" });
});


app.listen(PORT, () => {
    console.log("listening on ", PORT);
});