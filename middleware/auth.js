const User = require("../models/User");
const jwt = require("jsonwebtoken");
const pick = require("lodash/pick");
const ErrorResponce = require("../utils/ErrorResponce");

exports.protect = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      return next(new ErrorResponce("you need to login", 401));
    }
    const data = jwt.decode(req.cookies.token);
    if (data) {
      const user = await User.findById(data.id);
      if (user) {
        req.user = user;
        return next();
      }
      return next(new ErrorResponce("you need to login", 401));
    } else {
      return next(new ErrorResponce("you need to login", 401));
    }
  } catch (err) {
    next(err);
  }
};
