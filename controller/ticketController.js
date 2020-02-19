const Ticket = require("../models/Ticket");
const ErrorResponce = require("../utils/ErrorResponce");

exports.getTickets = async (req, res, next) => {
  try {
    const tickets = await Ticket.find({ userId: req.user._id })
      .populate("customer")
      .populate("department")
      .populate("employees")
      .lean();
    res.status(200).json({ success: true, data: tickets });
  } catch (err) {
    next(err);
  }
};

exports.addTicket = async (req, res, next) => {
  try {
    req.body.userId = req.user._id;
    let ticket = await Ticket.create(req.body);
    ticket = await Ticket.findById(ticket._id)
      .populate("customer")
      .populate("department")
      .populate("employees");
    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    next(err);
  }
};

exports.updateTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { runValidators: true, new: true }
    )
      .populate("customer")
      .populate("department")
      .populate("employees");
    if (!ticket) {
      return next(new ErrorResponce("ticket not found", 400));
    }
    res.status(200).json({ success: true, data: ticket });
  } catch (err) {
    next(err);
  }
};

exports.deleteTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });
    res.status(200).json({ success: true });
  } catch (err) {
    next(err);
  }
};

exports.resolveTicket = async (req, res, next) => {
  try {
    const ticket = await Ticket.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { isDone: req.body.isDone },
      { new: true, runValidators: true }
    );
    res.status(200).json({ success: true, data: ticket.isDone });
  } catch (err) {
    next(err);
  }
};
