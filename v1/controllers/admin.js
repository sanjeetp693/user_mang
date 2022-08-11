const validations = require("../validations/index");
const services = require("../services");
const response = require("../../utility/response");
const responseCode = require("../../utility/responseCode");
const messages = require("../../messages").messages.MESSAGES;

const { Model } = require("mongoose");


async function getUserDetails(req, res, next) {
    try {
        let expression = await services.admin.getUserDetails(req)
        return response.sendSuccessResponse(req, res, expression, responseCode.OK, process.lang.USER_DETAILS_FETCH)
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
   
    getUserDetails,
    getUserExpressionById
}