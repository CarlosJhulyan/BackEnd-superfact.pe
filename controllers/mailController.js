const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const util = require('util');
const emailConfig = require('../config/email');

const transport = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    auth: {
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});

const generarHTML = (filename, opciones) => {
    const html = pug.renderFile(`${__dirname}/../public/templates/${filename}.pug`, opciones);
    return juice(html);
}

exports.enviar = async (opciones) => {
    const html = generarHTML(opciones.filename, opciones);

    const message = {
        from: "SuperFACT <no-reply@superfact.pe>",
        to: opciones.user.email,
        subject: opciones.subject,
        html
    };

    const enviarEmail = util.promisify(transport.sendMail, transport);
    return enviarEmail.call(transport, message);
}