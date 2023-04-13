const uuid = require("uuid/v4");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place");
const User = require("../models/user");
const { default: mongoose } = require("mongoose");

const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid; //  { pid: 'p1 }
    let place;

    try {
        place = await Place.findById(placeId);
    } catch {
        const err = new HttpError(
            "Something went wrong, could not find a place",
            500
        );

        return next(err);
    }

    if (!place) {
        const err = new HttpError(
            "Could not find a place for the provided id.",
            505
        );
        return next(err);
    }

    res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
    const userID = req.params.uid;
    // let places;
    let userWithPlaces;
    try {
        userWithPlaces = await User.findById(userID ).populate('places');
    } catch {
        const err = new HttpError(
            "Could not find a place for the provided user id",
            500
        );
        return next(err);
    }

    if (!userWithPlaces || userWithPlaces.places.length === 0) {
        return next(
            new HttpError(
                "Could not find a place for the provided user id.",
                404
            )
        );
    }

    res.json({
        places: userWithPlaces.places.map((place) => place.toObject({ getters: true })),
    });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log({ errors: error.array() });
        return res.status(400).json({ errors: error.array() });
    }

    const { title, description, address, creator } = req.body;
    let coordinates;

    try {
        coordinates = await getCoordsForAddress(title);
    } catch (err) {
        return next(err);
    }

    const createdPLace = new Place({
        title,
        description,
        address,
        creator,
        location: coordinates,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRchbdWEujVptDWG2utJcpSVYvtl59V_315VQ6tO0x0uOVM9g9UKf72r7pt18fRMb5u4k&usqp=CAU",
    });

    let user;
    try {
        user = await User.findById(creator);
    } catch {
        const err = new HttpError(
            "Creating place failed, please try again",
            600
        );

        return next(err);
    }

    if (!user) {
        const err = new HttpError("Could not find user for provided id", 404);
        return next(err);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await createdPLace.save({ session: session });

        // its not standard push
        // its a method from mongoose, allows connection between two models
        user.places.push(createdPLace);
        await user.save({ session: session });

        await session.commitTransaction();
    } catch {
        const err = new HttpError(
            "Creating place failed, please tryagain.",
            500
        );

        return next(err);
    }

    res.status(201).json({ place: createdPLace });
};

const updatePlace = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        // 422 invalid user input
        console.log({ errors: error.array() });
        return next(
            new HttpError("Invalid inputs passed, please check your data", 422)
        );
    }

    const { title, description } = req.body;
    const placeId = req.params.pid;
    let place;

    try {
        place = await Place.findById(placeId);
    } catch {
        const err = new HttpError(
            "Something went wrong, could not find a place",
            500
        );

        return next(err);
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch {
        const err = new HttpError(
            "Something went wrong, could not update place",
            500
        );
        return next(err);
    }

    res.status(202).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
    const placeId = req.params.pid;
    let place;

    // try {
    //     place = await Place.deleteOne({ _id: placeId });
    // } catch {
    //     const err = new HttpError(
    //         "Something went wrong, could not delete a place",
    //         500
    //     );

    //     return next(err);
    // }

    // drugi pristup da nadjemo mjesto preko ID-a i obrisemo ga preko remove metode
    try {
        place = await Place.findById(placeId).populate("creator");
    } catch {
        const err = new HttpError(
            "Something went wrong, could not delete a place",
            500
        );
        return next(err);
    }

    if (!place) {
        const err = new HttpError("Could not find place for this id", 404);
        return next(err);
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();

        await place.remove({ session: session });

        place.creator.places.pull(place);
        await place.creator.save({ session: session });

        await session.commitTransaction();
    } catch {
        const err = new HttpError(
            "Something went wrong, could not save deleted place",
            500
        );
        return next(err);
    }

    res.status(202).json({ message: "Place is deleted", place: place.title });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;

exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
