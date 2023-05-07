const express = require("express");
const { check } = require("express-validator");

const accountControllers = require("../controllers/account-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const loginValidation = [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
];

const memberValidation = [
    check("firstName"),
    check("lastName"),
    check("organization"),
];



router.patch("/:uid", memberValidation, accountControllers.updateInfo);

module.exports = router;
