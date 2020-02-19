const User = require("../models/User");
const pick = require("lodash/pick");
const errorResponce = require("../utils/ErrorResponce");

const sendjwtresponce = async (user, res) => {
  const token = await user.getjwt();
  const details = pick(user, ["_id", "email", "username"]);
  res
    .status(200)
    .cookie("token", token)
    .json({ success: true, data: details });
};

exports.register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    sendjwtresponce(user, res);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return next(new errorResponce("invalid credentials", 400));
    }
    const user = await User.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!user) {
      return next(new errorResponce("invalid credentials", 400));
    }
    const verify = await user.verify(req.body.password);
    if (!verify) {
      return next(new errorResponce("invalid credentials", 400));
    }
    sendjwtresponce(user, res);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", null)
      .json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.getuser = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, data: req.user });
  } catch (err) {
    next(err);
  }
};
