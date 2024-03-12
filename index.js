const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });
const express = require("express");
const connectDb = require("./config/db.js");
const userRouter = require("./routes/user.routes.js");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = process.env.PORT || 4000;
connectDb();

app.use(userRouter);

app.get("/health", (req, res) => {
    res.json({ health: "running" });
});


app.listen(PORT, () => {
    console.log("listening on ", PORT);
});