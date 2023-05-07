const mongoose = require("mongoose");
const uniquerValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String },
    organization: { type: String },
});

userSchema.plugin(uniquerValidator);

module.exports = mongoose.model("User", userSchema);
