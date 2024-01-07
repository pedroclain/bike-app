"use strict";

const logger = require("../utils/logUtils");
const cardValidator = require("card-validator");

const validarCartao = async (nomeTitular, numero, validade, cvv) => {
	logger.info("Iniciando a função validarCartao");

	const cardNumberValidation = cardValidator.number(numero);
	const expirationDateValidation = cardValidator.expirationDate(validade);
	const cvvValidation = cardValidator.cvv(cvv);

	const responses = {
		cardNumberValidation,
		expirationDateValidation,
		cvvValidation,
	};

	console.log("Responses: ", responses);

	if (
		!cardNumberValidation.isValid ||
		!expirationDateValidation.isValid ||
		!cvvValidation.isValid ||
		!nomeTitular ||
		nomeTitular.length < 2
	) {
		return { statusCode: 422, message: "Dados Inválidos" };
	}

	return { statusCode: 200, message: "Cartão válido" };
};

module.exports = {
	validarCartao,
};
