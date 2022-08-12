const router = require("express").Router();
const Controllers = require("../controllers").admin;
const AuthService = require("../../auth/AuthService");

router.post("/login",Controllers.login)
router.post("/register",Controllers.register)
router.get("/dashboard",AuthService.userAuth("admin"),Controllers.dashboard)
router.get("/getUserDetails",AuthService.userAuth("admin"),Controllers.getUserDetails);
router.post("/editUserDetails",AuthService.userAuth("admin"),Controllers.editUserDetails);
router.get("/getUserDetailsById",AuthService.userAuth("admin"),Controllers.getUserDetailsById);
router.get("/getUserExpressionById/:id",AuthService.userAuth("admin"),Controllers.getUserExpressionById);


module.exports = router;
