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
async function getExpression(req, res, next) {
    try {
        let expression = await services.user.getExpression(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.CREATED, process.lang.LOGGED_IN_SUCCESSFULLY)
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
    getExpression
}