const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
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
    required: [true, "department is required"],
    validate: {
      validator: function(mobile) {
        return mobile.length === 10;
      },
      message: "enter a valid mobile number"
    }
  },
  departmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: [true, "department is required"]
  },
  image: {
    img_id: { type: String, required: [true, "image is required"] },
    img_url: { type: String, required: [true, "image is required"] }
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
