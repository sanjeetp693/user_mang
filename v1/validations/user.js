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
        firstName: joi.string().required(),
        lastName: joi.string().required(),
        email: joi.string().required(),
        phone: joi.string().required(),
        countryCode: joi.string().required(),
        password: joi.string().required(),
        profilePic: joi.string().optional()
    });

    return await validateSchema(req[property], schema);
};
const editProfile = async (req, property = "body") => {
    let schema = {};
    schema = joi.object().keys({
        firstName: joi.string().optional(),
        lastName: joi.string().optional(),
        email: joi.string().optional(),
        phone: joi.string().optional(),
        countryCode: joi.string().optional(),
        profilePic: joi.string().optional()
    });

    return await validateSchema(req[property], schema);
};
const validateLogIn = async (req, property = 'body') => {
    let schema = {}
    schema = joi.object().keys({
        countryCode: joi.string().optional(),
        email: joi.string().optional(),
        phone: joi.string().regex(/^[0-9]+$/).min(5).optional(),
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
module.exports = {
    validateSignUp,
    validateLogIn,
    editProfile,
    changePassword,
    addExpression
};

