const Model = require("../../models");
const responseCode = require("../../utility/responseCode");
const utility = require("../../utility/Utility");
const messages = require("../../messages").messages.MESSAGES;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
async function getUserExpressionById(req) {

    // console.log("ddddd", req.params.id)
    
    let expression = await Model.expression.find({userId : req.params.id, isDeleted : false})
    return expression
   
    
}
async function getUserDetails(req) {
   let user = await Model.user.find({isDeleted : false });
    return user
   
}
module.exports = {
    
    getUserDetails,
    getUserExpressionById
}