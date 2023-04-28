const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const loginValidation = [
    // check("email").normalizeEmail().isEmail(),
    check("firstName"),
    check("lastName"),
    check("password").isLength({ min: 5 }),
];

const signUpValidation = [
    ...loginValidation,
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
];

const editMemberValidation = [
    check("firstName"),
    check("lastName"),
    check("email").normalizeEmail().isEmail(),
    check("role"),
];

router.get("/", usersControllers.getUsers);

router.get("/:uid", usersControllers.getUser);

router.post("/login", loginValidation, usersControllers.loginUser);

router.post("/register", signUpValidation, usersControllers.registerUser);

router.post("/refresh-token", usersControllers.refreshToken);

router.patch("/:uid", editMemberValidation, usersControllers.updateUser);

router.use(checkAuth);

router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
