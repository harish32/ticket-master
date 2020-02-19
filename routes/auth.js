const express = require("express");
const router = express.Router();
const { register, login, logout, getuser } = require("../controller/auth");
const { protect } = require("../middleware/auth");

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/logout").get(logout);

router.route("/getuser").get(protect, getuser);

module.exports = router;
