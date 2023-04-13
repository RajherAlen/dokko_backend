const uuid = require("uuid/v4");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const User = require("../models/user");
let jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const DUMMY_USERS = [
    {
        id: "u1",
        name: "Alen Rajher",
        email: "arajher@mono.software",
        password: "mono.123",
    },
];

const getUser = async (req, res, next) => {
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

    const { username, email, password, role } = req.body;

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

    const createdUser = new User({
        username,
        email,
        password,
        role,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRchbdWEujVptDWG2utJcpSVYvtl59V_315VQ6tO0x0uOVM9g9UKf72r7pt18fRMb5u4k&usqp=CAU",
        places: [],
    });

    try {
        await createdUser.save();
    } catch {
        const err = new HttpError("Signing up failed, please try again", 500);
        return next(err);
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const loginUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        console.log({ errors: error.array() });
        res.status(400).json({ errors: error.array() });
    }

    const { username, password } = req.body;
    let existingUser;

    try {
        existingUser = await User.findOne({ username: username });
    } catch {
        const err = new HttpError("Login failed, please try again later", 500);

        return next(err);
    }

    if (!existingUser || existingUser.password !== password) {
        const err = new HttpError(
            "Invalid credentials, could not log you in.",
            422
        );

        return next(err);
    }

    let token = jwt.sign({ foo: "bar" }, "shhhhh");

    res.status(200).json({ message: "Logged in", token });
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

const refreshToken = async (req, res, next) => {
    let token = jwt.sign({ foo: "bar" }, "shhhhh");

    res.status(200).json({ token });
};

exports.getUser = getUser;
exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.refreshToken = refreshToken;
