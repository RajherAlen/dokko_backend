const express = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const loginValidation = [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
];

const signUpValidation = [
    ...loginValidation,
];

const memberValidation = [
    check("firstName"),
    check("lastName"),
    check("email").normalizeEmail().isEmail(),
    check("role"),
];

router.get("/", usersControllers.getUsers);

router.get("/:uid", usersControllers.getUser);

router.post("/login", loginValidation, usersControllers.loginUser);

router.post("/register", signUpValidation, usersControllers.registerUser);

router.post("/member-create", memberValidation, usersControllers.createMember);



router.post("/refresh-token", usersControllers.refreshToken);

router.patch("/:uid", memberValidation, usersControllers.updateUser);

router.use(checkAuth);

router.delete("/:uid", usersControllers.deleteUser);

module.exports = router;
