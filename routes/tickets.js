const express = require("express");
const router = express.Router();
const {
  addTicket,
  getTickets,
  updateTicket,
  deleteTicket,
  resolveTicket
} = require("../controller/ticketController");
const { protect } = require("../middleware/auth");

router
  .route("/")
  .get(protect, getTickets)
  .post(protect, addTicket);
router
  .route("/:id")
  .put(protect, updateTicket)
  .delete(protect, deleteTicket);

router.route("/:id/resolve").put(protect, resolveTicket);

module.exports = router;
