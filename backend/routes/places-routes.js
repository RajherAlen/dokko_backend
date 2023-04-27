const express = require("express");
const { check } = require("express-validator");
const checkAuth = require("../middleware/check-auth");

const placesControllers = require("../controllers/places-controllers");

const router = express.Router();

const createPlaceValidation = [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
];

const updatePlaceValidation = [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
];

router.get("/:pid", placesControllers.getPlaceById);
router.get("/user/:uid", placesControllers.getPlacesByUserId);

router.use(checkAuth);

router.post("/", createPlaceValidation, placesControllers.createPlace);

router.patch("/:pid", updatePlaceValidation, placesControllers.updatePlace);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router;
