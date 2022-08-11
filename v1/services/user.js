const Model = require("../../models");
const responseCode = require("../../utility/responseCode");
const utility = require("../../utility/Utility");
const messages = require("../../messages").messages.MESSAGES;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
async function createUser(req) {   
    let user;
    if (utility.isEmail(req.body.email)) {
        user = await Model.user.findOne({ email: req.body.email, isDeleted: false });
        if (user!=null) {
            throw process.lang.EMAILEXISTS
        }

    }
    if(utility.isPhone(req.body.phone && req.body.countryCode))
    {
        user = await Model.user.findOne({ phone: req.body.phone, countryCode: req.body.countryCode, isDeleted: false });
        if (user!=null) {
            throw process.lang.PHONEEXISTS
        }
    }
    req.body.password = await utility.hashPasswordUsingBcrypt(req.body.password);
    user = await Model.user.create(req.body);
    if (!user) {
        throw responseCode.BAD_REQUEST;
    }
    return user;
}
async function login(data) {
    let qry = {
        isDeleted: false,
    };
    if (utility.isEmail(data.email)) {
        qry.email = data.email;
    } else if (utility.isPhone(data.phone)) {
        qry.phone = data.phone;
        qry.countryCode = data.countryCode;
    }
    let user = await Model.user.findOne(qry, {
        password: 1
    }).lean();
    if (!user) {
        throw process.lang.NO_USER_FOUND;
    }
    console.log("-",data.password,user.password)
    let match = await utility.comparePasswordUsingBcrypt(data.password, user.password);
    console.log("match--",match)
    if (!match) {
        throw process.lang.INVALID_CREDENTAILS;
    }
    let result;
    if (user) {
          result = await Model.user.findById(user._id,{firstName:1,lastName:1,email:1,phone:1,countryCode:1}).lean();
          result.authToken = await utility.jwtSign({
            _id: user._id,
          });

    }
    return result;
}
async function editProfile(req) {   
    let user;
    console.log("body--",req.body)
    if (req.body.email) {
        user = await Model.user.findOne({ email: req.body.email, isDeleted: false });
        if (user!=null) {
            user = await Model.user.findOne({_id:{$ne:user._id},email: req.body.email, isDeleted: false})
            if(user){throw process.lang.EMAILEXISTS}  
        }
    }
    if(utility.isPhone(req.body.phone && req.body.countryCode))
    {
        user = await Model.user.findOne({ phone: req.body.phone, countryCode: req.body.countryCode, isDeleted: false });
        if (user!=null) {
            user = await Model.user.findOne({_id:{$ne:user._id},phone: req.body.phone, countryCode: req.body.countryCode, isDeleted: false})
            if(user){throw process.lang.PHONEEXISTS}
        }
    }
    user = await Model.user.findOneAndUpdate({_id:req.user._id},req.body,{new:true});
    if (!user) {
        throw responseCode.BAD_REQUEST;
    }
    return user;
}
async function changePassword(req) {   
    let user;
    user = await Model.user.findById(req.user._id,{password:1})
    if(user){
    let match = await utility.comparePasswordUsingBcrypt(req.body.oldPassword,user.password);
    if (!match) {
        throw process.lang.OLD_PASSWORD_INCORRECT;
    }
    req.body.password = await utility.hashPasswordUsingBcrypt(req.body.newPassword);
    user = await Model.user.findOneAndUpdate({_id:req.user._id},req.body,{new:true});
    }
    if (!user) {
        throw responseCode.BAD_REQUEST;
    }
    return user;
}
async function addExpression(req) {
    console.log("body---",req.body)   
    req.body.userId = req.user._id
    const expression = await Model.expression(req.body).save()
    // console.log("expression---",expression)
    if(expression==null){
        throw responseCode.BAD_REQUEST;
    }else{
        return expression;
    }
}
async function getExpression(req) {
    const expression = await Model.expression.find({userId:req.user._id})
    // console.log("expression---",expression)
    if(expression==null){
        throw responseCode.BAD_REQUEST;
    }else{
        return expression;
    }
}
module.exports = {
    createUser,
    login,
    editProfile,
    changePassword,
    addExpression,
    getExpression
}