const express = require("express");
const router = express.Router();
const {
  addEmployee,
  updateEmployee,
  removeEmployee
} = require("../controller/employeeController");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get()
  .post(protect, addEmployee);
router
  .route("/:id")
  .put(protect, updateEmployee)
  .delete(protect, removeEmployee);

module.exports = router;
