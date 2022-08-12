const joi = require("joi");
const validateSchema = async (inputs, schema) => {
    try {
        const { error, value } = schema.validate(inputs);
        if (error) throw error.details ? error.details[0].message.replace(/['"]+/g, "") : "";
        else return false;
    } catch (error) {
        throw error;
    }
};
const validateSignUp = async (req, property = "body") => {
    let schema = {};
    schema = joi.object().keys({
        name: joi.string().required(),
        email: joi.string().required(),
        password: joi.string().required(),
        profilePic: joi.string().optional()
    });

    return await validateSchema(req[property], schema);
};
const editUserDetails = async (req, property = "body") => {
    let schema = {};
    schema = joi.object().keys({
        userId:joi.string().optional(),
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        email: joi.string().optional(),
        phone: joi.string().optional(),
        countryCode: joi.string().optional(),
        profilePic: joi.string().optional()
    });

    return await validateSchema(req[property], schema);
};
const login = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        email: joi.string().optional(),
        password: joi.string().required(),

    });
    return await validateSchema(req[property], schema);
};
const changePassword = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        oldPassword:joi.string().required(),
        newPassword: joi.string().required(),

    });
    return await validateSchema(req[property], schema);
};
const addExpression = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        tittle:joi.string().required(),
        messages: joi.string().required(),

    });
    return await validateSchema(req[property], schema);
};
const editExpression = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        id:joi.string().required(),
        tittle:joi.string().optional(),
        messages: joi.string().optional(),

    });
    return await validateSchema(req[property], schema);
};
module.exports = {
    validateSignUp,
    login,
    changePassword,
    addExpression,
    editExpression,
    editUserDetails
};

