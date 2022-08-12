const validations = require("../validations/index");
const services = require("../services");
const response = require("../../utility/response");
const responseCode = require("../../utility/responseCode");
const messages = require("../../messages").messages.MESSAGES;

const { Model } = require("mongoose");

async function signup(req, res, next) {
    try {
        await validations.user.validateSignUp(req);
        let user = await services.user.createUser(req);
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.DETAILS_SAVED);
    } catch (error) {
        next(error);
    }
}
async function login(req, res, next) {
    try {
        await validations.user.validateLogIn(req)
        let user = await services.user.login(req.body)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.LOGGED_IN_SUCCESSFULLY)
    } catch (error) {
        next(error)
    }
}
async function editProfile(req, res, next) {
    try {
     console.log("user",req.user._id)
        await validations.user.editProfile(req)
        let user = await services.user.editProfile(req)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.LOGGED_IN_SUCCESSFULLY)
    } catch (error) {
        next(error)
    }
}
async function changePassword(req, res, next) {
    try {
     console.log("user",req.user._id)
        await validations.user.changePassword(req)
        let user = await services.user.changePassword(req)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.LOGGED_IN_SUCCESSFULLY)
    } catch (error) {
        next(error)
    }
}
async function userForgotPassword(req, res,next) {

    try {
           await validations.user.userForgotPassword(req)
           let user = await services.user.userForgotPassword(req)
           return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.LOGGED_IN_SUCCESSFULLY)
       } catch (error) {
           next(error)
       }
}
async function verifyOtp(req, res,next) {
    try {
           await validations.user.verifyOtp(req)
           let user = await services.user.verifyOtp(req)
           console.log("user---",user)
           if(user){
           return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.OTP_VERIFY)
           }else{
            return response.sendFailResponse(req, res, user, responseCode.BAD_REQUEST, process.lang.IVALID_OTP)

           }
       } catch (error) {
           next(error)
       }
}
async function resetForgotPassword(req, res,next) {
    try {
           await validations.user.resetForgotPassword(req)
           let user = await services.user.resetForgotPassword(req)
           if(user){
           return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.PASWORD_UPDATED)
           }
       } catch (error) {
           next(error)
       }
}
async function addExpression(req, res, next) {
    try {
     console.log("user",req.user._id)
        await validations.user.addExpression(req)
        let user = await services.user.addExpression(req)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.EXPRESSION_ADDED)
    } catch (error) {
        next(error)
    }
}
async function editExpression(req, res, next) {
    try {
     console.log("user",req.user._id)
        await validations.user.editExpression(req)
        let user = await services.user.editExpression(req)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.EXPRESSION_UPDATE)
    } catch (error) {
        next(error)
    }
}
async function deleteExpression(req, res, next) {
    try {
        let user = await services.user.deleteExpression(req)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.EXPRESSION_DELETE)
    } catch (error) {
        next(error)
    }
}
async function getExpression(req, res, next) {
    try {
        let expression = await services.user.getExpression(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.CREATED, process.lang.EXPRESSION_GET)
    } catch (error) {
        next(error)
    }
}
async function dashboard(req, res, next) {
    try {
        let expression = await services.user.dashboard(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.CREATED, "")
    } catch (error) {
        next(error)
    }
}
module.exports = {
    signup,
    login,
    editProfile,
    changePassword,
    addExpression,
    getExpression,
    dashboard,
    editExpression,
    deleteExpression,
    userForgotPassword,
    verifyOtp,
    resetForgotPassword
}