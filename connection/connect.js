const mongoose = require("mongoose");
const config = require('config');
const Model = require('../models')


var mongoDbconnection = async function () {
    var url = config.get("mongo.url")
    console.log(url)
    if (process.env.NODE_ENV == 'docker') {
        await mongoose.connect(url, {
            auth: {
                authSource: config.get("mongo.authSource")
            },
            user: config.get("mongo.user"),
            pass: config.get("mongo.pass"),
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
    } else {
        await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
    }
};

module.exports = {
    mongoDbconnection: mongoDbconnection
};