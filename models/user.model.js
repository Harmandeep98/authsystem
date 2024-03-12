const { default: mongoose } = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error("Enter a valid email");
            }
        }
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    role: {
        type: String,
        default: "user",
    },
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    return this.password = await bcrypt.hash(this.password, parseInt(process.env.SALTROUNDS));
});

userSchema.methods.getJwtToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, process.env.EXPIRES_JWT)
}

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
