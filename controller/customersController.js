const Customer = require("../models/Customer");
const ErrorResponce = require("../utils/ErrorResponce");

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find({ userId: req.user._id }).lean();
    res.status(200).json({ success: true, data: customers });
  } catch (err) {
    next(err);
  }
};

exports.addCustomer = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    const customer = await Customer.create(req.body);
    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
};

exports.removeCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!customer) {
      return next(new ErrorResponce("customer not found", 400));
    }
    await customer.remove();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

exports.updateCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      userId: req.user._id
    });
    if (!customer) {
      return next(new ErrorResponce("customer not found", 400));
    }
    customer.mobile = req.body.mobile;
    customer.email = req.body.email;
    customer.name = req.body.name;
    await customer.save({ validateBeforeSave: true });
    res.status(200).json({ success: true, data: customer });
  } catch (err) {
    next(err);
  }
};
