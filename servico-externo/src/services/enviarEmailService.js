"use strict";

const logger = require("../utils/logUtils");
const nodemailer = require("nodemailer");

const EMAIL_BICICLETARIO = process.env.EMAIL_BICICLETARIO;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const enviarEmail = async (email, assunto, mensagem) => {
	logger.info("Iniciando a função enviarEmail");

	const validateEmailResponse = await validateEmail(email);

	if (validateEmailResponse === true) {
		const mailOptions = {
			from: EMAIL_BICICLETARIO,
			to: email,
			subject: assunto,
			text: mensagem,
		};

		return transporter.sendMail(mailOptions).then((response) => {
			logger.info(response.response);
			return { statusCode: 200, message: "Envio de email solicitado" };
		});
	} else {
		return validateEmailResponse;
	}
};

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: EMAIL_BICICLETARIO,
		pass: EMAIL_PASSWORD,
	},
});

const validateEmail = async (email) => {
	const isValid =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);
	return isValid ? true : { statusCode: 422, message: "Email inválido" };
};

module.exports = {
	enviarEmail,
};
