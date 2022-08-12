const validations = require("../validations/index");
const services = require("../services");
const response = require("../../utility/response");
const responseCode = require("../../utility/responseCode");
const messages = require("../../messages").messages.MESSAGES;

const { Model } = require("mongoose");

async function register(req, res, next) {
    try {
        await validations.admin.validateSignUp(req);
        let user = await services.admin.createAdmin(req);
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.DETAILS_SAVED);
    } catch (error) {
        next(error);
    }
}
async function login(req, res, next) {
    try {
        await validations.admin.login(req)
        let user = await services.admin.login(req.body)
        return response.sendSuccessResponse(req, res, user, responseCode.CREATED, process.lang.LOGGED_IN_SUCCESSFULLY)
    } catch (error) {
        next(error)
    }
}
async function getUserDetails(req, res, next) {
    try {
        let expression = await services.admin.getUserDetails(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.OK, process.lang.USER_DETAILS_FETCH)
    } catch (error) {
        next(error)
    }
}
async function editUserDetails(req, res, next) {
    try {
        await validations.admin.editUserDetails(req)
        let expression = await services.admin.editUserDetails(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.OK, process.lang.UPDATED_SUCCESSFULLY)
    } catch (error) {
        next(error)
    }
}
async function getUserDetailsById(req, res, next) {
    try {
        let expression = await services.admin.getUserDetailsById(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.OK, process.lang.USER_DETAILS_FETCH)
    } catch (error) {
        next(error)
    }
}
async function dashboard(req, res, next) {
    try {
        let expression = await services.admin.dashboard(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.OK, "")
    } catch (error) {
        next(error)
    }
}

async function getUserExpressionById(req, res, next) {
    try {
        let expression = await services.admin.getUserExpressionById(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.OK, process.lang.USER_DETAILS_FETCH)
    } catch (error) {
        next(error)
    }
}
module.exports = {
    login,
    register,
    getUserDetails,
    getUserExpressionById,
    dashboard,
    editUserDetails,
    getUserDetailsById
}