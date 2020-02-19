const express = require("express");
const router = express.Router();
const {
  editDepartment,
  removeDepartment,
  addDepartment,
  getDepartments
} = require("../controller/departmentsController");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getDepartments)
  .post(protect, addDepartment);
router
  .route("/:id")
  .put(protect, editDepartment)
  .delete(protect, removeDepartment);

module.exports = router;
