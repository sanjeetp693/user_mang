const router = require("express").Router();
const Controllers = require("../controllers").user;
const AuthService = require("../../auth/AuthService");

router.post("/register", Controllers.signup);
router.post("/login", Controllers.login);
router.post("/editProfile" , AuthService.userAuth("user"), Controllers.editProfile);
router.post("/changePassword" , AuthService.userAuth("user"), Controllers.changePassword);
//router.post("/forgotPassword",Controllers.forgotPassword);
router.post("/expression",AuthService.userAuth("user"), Controllers.addExpression);
router.get("/expression",AuthService.userAuth("user"), Controllers.getExpression);
// router.get("/dashboard",AuthService.userAuth("user"), Controllers.dashboard);
module.exports = router;
