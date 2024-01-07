'use strict'

const logger = require('../utils/logUtils');
const enviarEmailService = require('../services/enviarEmailService');

const enviarEmail = async (req, res) => {
    const { email, assunto, mensagem } = req.body;
    const enviarEmailResult = await enviarEmailService.enviarEmail(email, assunto, mensagem);

    logger.info(enviarEmailResult);

    return res.status(enviarEmailResult.statusCode).send(enviarEmailResult.message);
};

module.exports = {
    enviarEmail,
};