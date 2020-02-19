const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = {
  code: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  message: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
};

const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket;
