const express = require("express");
const database = require("./config/database");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const cookieparser = require("cookie-parser");
const expressFileupload = require("express-fileupload");
database();
const path = require("path");

const error = require("./middleware/error");
const auth = require("./routes/auth");
const customers = require("./routes/customers");
const departments = require("./routes/departments");
const employees = require("./routes/employees");
const tickets = require("./routes/tickets");

app.use(expressFileupload());
app.use(cookieparser());
app.use(express.json());
app.use("/api/user", auth);
app.use("/api/customers", customers);
app.use("/api/departments", departments);
app.use("/api/employees", employees);
app.use("/api/tickets", tickets);

app.use(error);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
