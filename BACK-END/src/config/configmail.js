const email = require('nodemailer');
const transport = email.createTransport({
    service:'gmail',
    auth: {
        user:'fitiavanajonathanjunior@gmail.com',
        pass:process.env.MAIL_PASS
    }
})
module.exports = transport