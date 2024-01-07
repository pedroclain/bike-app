'use strict'

const logger = require('../utils/logUtils');
const validaCartaoService = require('../services/validaCartaoService');

const validarCartao = async (req, res) => {
    logger.info('Rota validarCartão chamada');

    const { nomeTitular, numero, validade, cvv } = req.body;

    const validarCartaoResponse = await validaCartaoService.validarCartao(nomeTitular, numero, validade, cvv);

    return res.status(validarCartaoResponse.statusCode).send(validarCartaoResponse.message);
};

module.exports = {
    validarCartao,
};
