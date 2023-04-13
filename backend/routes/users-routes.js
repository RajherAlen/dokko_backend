const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");

const router = express.Router();

const loginValidation = [
    // check("email").normalizeEmail().isEmail(),
    check("username"),
    check("password").isLength({ min: 5 }),
];

const signUpValidation = [
    ...loginValidation,
    check("username").not().isEmpty(),
];

router.get("/", usersControllers.getUser);

router.post("/login", loginValidation, usersControllers.loginUser);

router.post("/register", signUpValidation, usersControllers.registerUser);

router.delete("/:uid", usersControllers.deleteUser);

router.post("/refresh-token", usersControllers.refreshToken);

module.exports = router;
