const User = require("../models/user");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const updateInfo = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        // 422 invalid user input
        console.log({ errors: error.array() });
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
        );
    }

    const { firstName, lastName, organization } = req.body;
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
    user.organization = organization;

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

exports.updateInfo = updateInfo;
