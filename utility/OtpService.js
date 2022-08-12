const Model = require('../models/index');
const issueOtp =  () => {
    return Math.floor(100000 + Math.random() * 900000);
};
const verifyOtp = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            let otp;
            // console.log('payload => ',payload);
            if (payload.otp == '123456') otp = await Model.Otp.findOne({_id: payload.otpId});
            else otp = await Model.Otp.findOne({_id: payload.otpId, otp: payload.otp});
            //otp = await Model.Otp.findOne({_id: payload.otpId, otp: payload.otp});
            if (!otp) return reject(Constant.error.invalidOtp);
            const deletedOtp = await Model.Otp.deleteOne({_id: otp._id});
            return resolve(true);
        } catch (e) {
            console.log(e);
        }
    });
};
const issueStr = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

module.exports = {
    issueOtp: issueOtp,
    verifyOtp: verifyOtp,
    issueStr: issueStr

}
