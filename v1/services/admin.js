const Model = require("../../models");
const responseCode = require("../../utility/responseCode");
const utility = require("../../utility/Utility");
const messages = require("../../messages").messages.MESSAGES;
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

async function createAdmin(req) {   
    let user;
    if (utility.isEmail(req.body.email)) {
        user = await Model.admin.findOne({ email: req.body.email, isDeleted: false });
        if (user!=null) {
            throw process.lang.EMAILEXISTS
        }

    }
    req.body.password = await utility.hashPasswordUsingBcrypt(req.body.password);
    user = await Model.admin.create(req.body);
    if (!user) {
        throw responseCode.BAD_REQUEST;
    }
    return user;
}
async function getUserExpressionById(req) {

    let expression = await Model.expression.find({userId : req.params.id, isDeleted : false})
    return expression   
}
async function getUserDetails(req) {
   let user = await Model.user.find({isDeleted : false });
    return {users:user,
            count:user.length}
   
}
async function dashboard(req) {
    let userCount = await Model.user.countDocuments({isDeleted : false });
    let expressCount = await Model.expression.countDocuments({isDeleted:false});
    let allUser = await Model.user.find({isDeleted : false });
    let data = {
        userCount:userCount,
        expressCount:expressCount,
        allUser:allUser
    }
     return data
    
 }
async function login(data) {
    let admin = await Model.admin.findOne({email:data.email}, {
        password: 1
    }).lean();
    console.log("admin--",admin)
    if (!admin) {
        throw process.lang.EMAILNOTEXIST;
    }
    let match = await utility.comparePasswordUsingBcrypt(data.password, admin.password);
    console.log("match--",match)
    if (!match) {
        throw process.lang.INVALID_CREDENTAILS;
    }
    let result;
    if (admin) {
          result = await Model.admin.findById(admin._id,{name:1,email:1}).lean();
          console.log(admin._id)
          result.authToken = await utility.jwtSign({
            _id: admin._id,
          });

    }
    return result;
}
async function editUserDetails(req) {  
    if(!req.body.userId) throw process.lang.USERIDREQUIRED  
    let user;
    if (req.body.email) {
        user = await Model.user.findOne({ email: req.body.email, isDeleted: false });
        if (user!=null) {
            user = await Model.user.findOne({_id:{$ne:req.body.userId},email: req.body.email, isDeleted: false})
            if(user){throw process.lang.EMAILEXISTS}  
        }
    }
    if(utility.isPhone(req.body.phone && req.body.countryCode))
    {
        user = await Model.user.findOne({ phone: req.body.phone, countryCode: req.body.countryCode, isDeleted: false });
        if (user!=null) {
            user = await Model.user.findOne({_id:{$ne:req.body.userId},phone: req.body.phone, countryCode: req.body.countryCode, isDeleted: false})
            if(user){throw process.lang.PHONEEXISTS}
        }
    }
    user = await Model.user.findOneAndUpdate({_id:req.body.userId},req.body,{new:true});
    if (!user) {
        throw responseCode.BAD_REQUEST;
    }
    return user;
}
async function getUserDetailsById(req) {
    if(!req.query.userId) throw process.lang.USERIDREQUIRED  
    let user = await Model.user.findById(req.query.userId);
     return {users:user,
             count:user.length}
    
 }
module.exports = {
    login,
    createAdmin,
    getUserDetails,
    getUserExpressionById,
    dashboard,
    editUserDetails,
    getUserDetailsById
}