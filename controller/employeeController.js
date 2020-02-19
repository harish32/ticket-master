const Employee = require("../models/Employee");
const cloudinary = require("../config/cloundinary");
const datauri = require("../config/datauri");
const ErrorResponce = require("../utils/ErrorResponce");

exports.addEmployee = async (req, res, next) => {
  try {
    if (req.body.file) {
      return next(new Error("image is required", 400));
    }
    if (!req.files.file) {
      return next(new Error("image required", 400));
    }
    if (req.files.file.size > 1000000) {
      return next(new Error("image is too big", 400));
    }
    const uri = datauri(req).content;
    const image = await cloudinary.uploader.upload(uri);
    req.body.image = { img_url: image.secure_url, img_id: image.public_id };
    req.body.userId = req.user._id;
    const employee = await Employee.create(req.body);
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};

exports.removeEmployee = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!employee) {
      return next(new ErrorResponce("employee not found", 400));
    }
    await employee.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    let image;
    const employee = await Employee.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!employee) {
      return next(new ErrorResponce("employee not found", 400));
    }
    console.log(req.files);
    if (req.files) {
      console.log("hello");
      await cloudinary.uploader.destroy(employee.image.img_id);
      if (req.files.file.size > 1000000) {
        return next(new Error("image is too big", 400));
      }
      const uri = datauri(req).content;
      image = await cloudinary.uploader.upload(uri);
      console.log(image);
    }
    if (image) {
      employee.image = { img_url: image.secure_url, img_id: image.public_id };
    }
    employee.name = req.body.name;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    await employee.save({ validateBeforeSave: true });
    res.status(200).json({ success: true, data: employee });
  } catch (err) {
    next(err);
  }
};
