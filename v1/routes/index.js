const express = require("express");
const user = require("./user");
const admin = require("./admin");


const router = express();
 router.use("/user", user);
 router.use("/admin", admin);


module.exports = router;
