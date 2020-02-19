const router = require("express").Router();
const customerController = require("../app/controller/customersController");
const departmentController = require("../app/controller/departmentsController");
const employeeController = require("../app/controller/employeeController");
const ticketController = require("../app/controller/ticketController");
const user = require("../app/controller/auth");
const auth = require("../app/middleware/auth");
//users

router.post("/user/login", user.login);
router.post("/user/register", user.register);
router.get("/user/logout", user.logout);
router.get("/user/getuser", auth.protect, user.getuser);

//  customers

router.post("/customers", auth.protect, customerController.addCustomer);
router.delete("/customers/:id", auth.protect, customerController.remove);
router.put("/customers/:id", auth.protect, customerController.update);

//  departments

router.post("/departments", auth.protect, departmentController.addDepartment);
router.delete("/departments/:id", auth.protect, departmentController.remove);
router.put(
  "/departments/:id",
  auth.protect,
  departmentController.editDepartment
);

//employees

router.post("/employees", auth.protect, employeeController.addEmployee);
router.delete("/employees", auth.protect, employeeController.remove);
router.put("/employees/:id", auth.protect, employeeController.update);

//tickets

router.get("/tickets", ticketController.list);
router.get("/tickets/:id", ticketController.show);
router.post("/tickets", ticketController.addTicket);
// router.delete("/tickets",ticketController.remove)
// router.put("/tickets/:id",ticketController.update)

module.exports = router;
