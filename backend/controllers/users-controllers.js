const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUser = async (req, res, next) => {
    const userId = req.params.uid;
    let user;

    try {
        user = await User.findById(userId);
    } catch {
        const err = new HttpError(
            "Something went wrong, could not find a user",
            500
        );
        return next(err);
    }

    if (!user) {
        const err = new HttpError("Could not find user for this id", 404);
        return next(err);
    }

    res.status(200).json({ user });
};

const getUsers = async (req, res, next) => {
    // or we can find ('email username')
    let users;
    try {
        users = await User.find({}, "-password");
    } catch {
        const err = new HttpError(
            "Fetching users failed, please try again later",
            500
        );
        return next(err);
    }

    res.json({
        users: users.map((user) => user.toObject({ getters: true })),
    });
};

const registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(
            new HttpError("invalid input passed, please check your data", 422)
        );
    }

    const { firstName, lastName, email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch {
        const err = new HttpError(
            "Signing up failed, please try again later",
            500
        );

        return next(err);
    }

    if (existingUser) {
        const err = new HttpError(
            "User exists already, please login instead.",
            422
        );

        return next(err);
    }

    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    } catch {
        const err = new HttpError(
            "Could not create user, please try again",
            500
        );
        return next(err);
    }

    const createdUser = new User({
        firstName: "",
        lastName: "",
        email,
        password: hashedPassword,
        role: "viewer",
    });

    try {
        await createdUser.save();
    } catch {
        const err = new HttpError("Signing up failed, please try again", 500);
        return next(err);
    }

    let token;
    try {
        jwt.sign(
            { userId: createdUser.id, email: createdUser.email },
            "secret_dont_share",
            { expiresIn: "1h" }
        );
    } catch {
        const err = new HttpError("Signing up failed, please try again", 500);
        return next(err);
    }

    res.status(201).json({
        user: {
            userId: createdUser.id,
            email: createdUser.email,
            token,
        },
    });
};

const loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return next(
            new HttpError("invalid input passed, please check your data", 422)
        );
    }

    const { username, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ username: username });
    } catch {
        const err = new HttpError("Login failed, please try again later", 500);

        return next(err);
    }

    if (!existingUser) {
        const err = new HttpError(
            "Invalid credentials, could not log you in.",
            422
        );

        return next(err);
    }

    let isValidPassword = false;
    try {
        // we are comparing password from req and hashed password from DB and returning booleand
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    } catch {
        const err = new HttpError(
            "Could not log you in, please check your credentials and try again",
            500
        );
        return next(err);
    }

    if (!isValidPassword) {
        const err = new HttpError(
            "Invalid credentials, could not log you in",
            500
        );
        return next(err);
    }

    let token;
    try {
        token = jwt.sign(
            { userId: existingUser.id, email: existingUser.email },
            "secret_dont_share",
            { expiresIn: "1h" }
        );
    } catch {
        const err = new HttpError("Logging in failed, please try again", 500);
        return next(err);
    }

    res.status(201).json({
        userInfo: existingUser,
        userToken: token,
    });
};

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;
    let user;

    try {
        user = await User.findById(userId);

        await User.deleteOne({ _id: userId });
    } catch {
        const err = new HttpError(
            "Something went wrong, could not delete a user",
            500
        );
        return next(err);
    }

    if (!user) {
        const err = new HttpError("Could not find user for this id", 404);
        return next(err);
    }

    res.status(200).json({ user });
};

const updateUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        // 422 invalid user input
        console.log({ errors: error.array() });
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
        );
    }

    const { firstName, lastName, email, role } = req.body;
    let user;

    try {
        user = await User.findById(req.params.uid);
    } catch {
        const err = new HttpError(
            "Something went wrong, could not delete a user",
            500
        );
        return next(err);
    }

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.role = role;

    try {
        await user.save();
    } catch {
        const err = new HttpError(
            "Something went wrong, could not update user",
            500
        );
        return next(err);
    }

    res.status(202).json({ user: user.toObject({ getters: true }) });
};

const refreshToken = async (req, res, next) => {
    let token = jwt.sign(
        { userId: createdUser._id, email: createdUser.email },
        "shhhhh"
    );

    res.status(200).json({ token });
};

exports.getUser = getUser;
exports.getUsers = getUsers;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.refreshToken = refreshToken;
