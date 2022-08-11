
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const fs = require("fs");
const path = require('path')
var crypto = require("crypto");
const configSec = require('../config/config')

module.exports = {
  hashPasswordUsingBcrypt: async (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  },
  comparePasswordUsingBcrypt: async (pass, hash) => {
    return bcrypt.compareSync(pass, hash)
  },
  isEmail: (value) => {
    let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
  },

  isPhone: (value) => {
    let intRegex = /[0-9 -()+]+$/;
    return intRegex.test(value)
  },
  jwtSign: async (payload) => {
    try {
      return jwt.sign(payload, configSec.SecretKey, {
        expiresIn: '30d',
      });
    } catch (error) {
      throw error;
    }
  },
  jwtVerify: async (token) => {
    return jwt.verify(token, configSec.SecretKey);
  },


}
