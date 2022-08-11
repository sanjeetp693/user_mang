const router = require("express").Router();
const Controllers = require("../controllers").admin;
const AuthService = require("../../auth/AuthService");


router.get("/getUserDetails",Controllers.getUserDetails);
router.get("/getUserExpressionById/:id", Controllers.getUserExpressionById);


module.exports = router;
