const mongoose = require("mongoose");
const uniquerValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    places: [{ type: mongoose.Types.ObjectId, required: true, ref: "Place" }],
    role: { type: String },
});

userSchema.plugin(uniquerValidator);

module.exports = mongoose.model("User", userSchema);