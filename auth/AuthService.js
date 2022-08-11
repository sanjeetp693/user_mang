const Utility = require("../utility/Utility");
const Model = require('../models/index');
const mongoose = require('mongoose');

module.exports.userAuth = (...args) => async (req, res, next) => {
  try {
    let roles = [].concat(args).map((role) => role);
    let token = String(req.headers.authorization || "").replace(/bearer|jwt/i, "").replace(/^\s+|\s+$/g, "").split(" ");
    console.log("token----",token);
    if (!token || token[0] == "guest" || token[0] == "Guest" ) {
      let deviceId = "";
      if(token && token[1]){
        deviceId = token[1]
      }
      let user = await Model.user.findOne({ deviceId: deviceId, status: 5, appId: req.headers.appid });
      if (!user) {
        user = await Model.user({ deviceId: [deviceId], status: 5, appId: req.headers.appid }).save();
      }
      req.user = user;
      return next();
    } else {
      roles = "user";
    }
    token = token[0];
    const decodeData = await Utility.jwtVerify(token);
    let doc = null;
    let role = "";
    let qry = {
      _id: mongoose.Types.ObjectId(decodeData._id),
    };
    if (roles.includes("user")) {
      role = "user";
      doc = await Model.user.findOne(qry);
      if (!doc) {
        roles = "admin";
      };
    };
    if (roles.includes("admin")) {
      role = "admin";
      doc = await Model.admin.findOne({
        appId: req.headers.appid,
        _id : mongoose.Types.ObjectId(decodeData._id)
      });
    };
    if (!doc) {
      return res.status(401).send({
        data: {},
        status: 401,
        success: false,
        message: "INVALID_TOKEN"
      });
    };
    if (role) req[role] = doc.toJSON();
    next();
  } catch (error) {
    const message = String(error.name).toLowerCase() === "error" ? error.message : "UNAUTHORIZED_ACCESS";
    return res.status(401).send({
      data: {},
      status: 401,
      success: false,
      message: message
    });
  }
};
