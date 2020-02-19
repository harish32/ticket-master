const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name is required"]
  },
  email: {
    type: String,
    required: [true, "email is required"],
    match: [
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "email is not valid"
    ]
  },
  mobile: {
    type: String,
    required: [true, "mobile no is required"],
    validate: {
      validator: function(mobile) {
        return mobile.length === 10;
      },
      message: "enter a valid mobile number"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

customerSchema.index({ email: 1, userId: 1 }, { unique: true });

customerSchema.index({ mobile: 1, userId: 1 }, { unique: true });

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
