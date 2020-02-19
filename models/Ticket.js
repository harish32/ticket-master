const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = {
  code: {
    type: String,
    required: [true, "code is required"]
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium"
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: [true, "customer is required"]
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "department is required"]
  },
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
  message: {
    type: String,
    required: [true, "message is required"]
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
