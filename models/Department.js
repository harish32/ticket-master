const mongoose = require("mongoose");
const Employee = require("./Employee");

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      unique: [true, "name must be unique"]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

departmentSchema.virtual("employees", {
  ref: "Employee",
  localField: "_id",
  foreignField: "departmentId",
  justOne: false
});

departmentSchema.pre("remove", async function() {
  await Employee.deleteMany({ departmentId: this._id });
});

departmentSchema.index({ name: 1, userId: 1 }, { unique: true });

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
