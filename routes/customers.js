const express = require("express");
const router = express.Router();
const {
  getCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer
} = require("../controller/customersController");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getCustomers)
  .post(protect, addCustomer);
router
  .route("/:id")
  .put(protect, updateCustomer)
  .delete(protect, removeCustomer);

module.exports = router;
