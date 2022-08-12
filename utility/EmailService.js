const Model = require('../models/index');
const fromMail = `essentials111 <noreply.contact@essentials111.com>`;
const nodeMailer = require('nodemailer');
let transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'contact@essentials111.com',
        pass: 'Hillingdon123'
    },
    tls: {
        rejectUnauthorized: false
    }
});
module.exports = {
    async sendForgotPasswordOtp(payload) {
        return new Promise((resolve, reject) => {
            const msg = {
                from: fromMail,
                to: payload.email,
                subject: 'Forgot Password',
                html: `
                <h3>Dear user, use this otp to reset your password.</h3>
                <hr>
                <table>
                    <tr>
                        <td>Code:</td>
                        <th>${payload.otp}</th>
                    </tr>
                </table>
                `
            };
            transporter.sendMail(msg, (error, info) => {
                if (error) return reject(error);
                return resolve(info);
            });
            // sendGrid.send(msg).then(info => {
            //     resolve(msg);
            // }).catch(error => {
            //     reject(error);
            // });
        });
    }
}

