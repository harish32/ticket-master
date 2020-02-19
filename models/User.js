const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, "email must be unique"],
    match: [
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "email is not valid"
    ]
  },
  password: {
    type: String,
    required: [true, "password is required"],
    validate: {
      validator: function(password) {
        return password.length > 8;
      },
      message: "password must be atleast 8 charecters"
    },
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.pre("save", async function(next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.verify = async function(password) {
  const verify = await bcrypt.compare(password, this.password);
  console.log(verify);
  return verify;
};

userSchema.methods.getjwt = function() {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "14d"
  });
  return token;
};

module.exports = User = mongoose.model("User", userSchema);
