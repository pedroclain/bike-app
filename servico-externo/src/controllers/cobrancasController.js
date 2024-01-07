'use strict'

const Cobranca = require('../models/cobranca');
const realizarCobrancaService = require('../services/realizarCobrancaService');

const realizarCobranca = async (req, res) => {
    const { valor, ciclista } = req.body;

    const cobrancaResult = await realizarCobrancaService.realizarCobranca(valor, ciclista);

    return res.status(cobrancaResult.statusCode).send(cobrancaResult.message);
};

const obterCobranca = async (req, res) => {

    const { id } = req.params;
    const cobrancaCiclista = await Cobranca.findOne({
      where: {
        id
      }
    })

    if(!cobrancaCiclista){
        return res.send('Cobrança não encontrada');
    } else {
        return res.send(cobrancaCiclista);
    }
};

module.exports = {
    realizarCobranca,
    obterCobranca,
}