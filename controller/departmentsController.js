const Department = require("../models/Department");
const ErrorResponce = require("../utils/ErrorResponce");

exports.getDepartments = async (req, res, next) => {
  try {
    const departments = await Department.find({
      userId: req.user._id
    })
      .populate("employees")
      .lean();
    res.status(200).json({ success: true, data: departments });
  } catch (err) {
    next(err);
  }
};

exports.addDepartment = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const department = await Department.create(req.body);
    department.employees = [];
    res.status(200).json({ success: true, data: department });
  } catch (err) {
    next(err);
  }
};

exports.editDepartment = async (req, res, next) => {
  try {
    const department = await Department.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!department) {
      return next(new ErrorResponce("department not found", 400));
    }
    department.name = req.body.name;
    await department.save({ validateBeforeSave: true });
    res.status(200).json({ success: true, data: department.name });
  } catch (error) {
    next(err);
  }
};

exports.removeDepartment = async (req, res, next) => {
  try {
    const department = await Department.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!department) {
      return next(new ErrorResponce("department not found", 400));
    }
    await department.remove();
    res.status(200).json({ success: true });
  } catch (error) {
    res.json(error);
  }
};
