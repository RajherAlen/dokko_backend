const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*', ) // * ALL
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

// express js will only forward request to our placesRoutes
// if path start with first argument
// in our case '/api/places...'
app.use("/api/places", placesRoutes); // => /api/places/...
app.use("/api/users", usersRoutes); // => /api/places/...

app.use((req, res, next) => {
    const error = new HttpError("Could not find this", 404);
    throw error;
});

app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }

    res.status(err.code || 500).json({
        message: err.message || "An unknown error occurred",
    });
});

mongoose.set("strictQuery", false);
mongoose
    .connect(
        "mongodb+srv://alenRA:q7oOM9J8RqagARu8@cluster0.yku7p.mongodb.net/mern?retryWrites=true&w=majority"
    )
    .then(() => app.listen(5000))
    .catch((err) => console.log(err));
