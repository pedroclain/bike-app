"use strict";

const axios = require("axios");
const logger = require("../utils/logUtils");

const BASE_URL = process.env.CICLISTA_URL;

const getCiclistaById = async (id) => {
	try {
		const url = new URL(`${BASE_URL}/ciclista/${id}`).toString();

		logger.info(`Requisição HTTP interna: ${url}`);
    
		return axios.get(url);
	} catch (error) {
		logger.error(error.message, error.stack);
	}
};

const getCartaoDeCreditoByCiclistaId = async (id) => {
	try {
		const url = new URL(`${BASE_URL}/cartaoDeCredito/${id}`).toString();

		logger.info(`Requisição HTTP interna: ${url}`);

		return await axios.get(url);
	} catch (error) {
		logger.error(error.message, error.stack);
	}
};

module.exports = {
	getCiclistaById,
	getCartaoDeCreditoByCiclistaId,
};
