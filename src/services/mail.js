const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const BaseModel = require('./baseModel');

class MailService extends BaseModel {
    constructor() {
        super();

        this.client = nodemailer.createTransport(sgTransport({
            auth: {
                api_key: process.env.SENDGRID_API
            }
        }));
    } 

    async sendMail(mail) {
        this.client.sendMail(mail, (err, info) => {
            if (err ){
                return false;
            }
            return true;
        });
    };
}

module.exports = MailService;
