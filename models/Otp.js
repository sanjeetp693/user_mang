const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const OtpModel = new Schema({
    otp: {
        type: String,
        required: [true, 'Otp is required.']
    },
    key: {
        type: String,
        required: [true, 'Otp key is required.']
    }
}, {
    timestamps: true
});
const Otp = mongoose.model('Otp', OtpModel);
module.exports = Otp;
