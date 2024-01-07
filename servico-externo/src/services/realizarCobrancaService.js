"use strict";

const logger = require("../utils/logUtils");
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const uuid = require("uuid");
const enviarEmail = require("../services/enviarEmailService");
const aluguelServiceApi = require("../apis/aluguelServiceApi");
const Cobranca = require("../models/cobranca");

let infoPagamentoCiclista;

const realizarCobranca = async (valor, ciclistaId) => {
	const valorEmCentavos = valor * 100;
	const horaSolicitacao = new Date().toISOString();

	try {
		let infoPagamentoCiclista = await getCiclistaInfo(ciclistaId);
		const customerId = await createCustomer(
			infoPagamentoCiclista.email,
			infoPagamentoCiclista.nome
		);
		const cardId = await addCardToCustomer(customerId, "tok_visa");
		const charge = await chargeCustomer(customerId, cardId, valorEmCentavos);

		await enviarEmail.enviarEmail(
			infoPagamentoCiclista.email,
			"Recibo Transação Bicicletário",
			charge.receipt_url
		);
		const message = await buildResponse(
			"CONFIRMADO",
			valor,
			ciclistaId,
			horaSolicitacao,
			false
		);
    await Cobranca.create({
      ciclista: ciclistaId,
      valor,
      status: "CONFIRMADO",
      horaSolicitacao

    })
		return { statusCode: 200, message };
	} catch (err) {
		logger.error(err);
		return { statusCode: 422, message: "Dados Inválidos" };
	}
};

const getCiclistaInfo = async (ciclistaId) => {
	const ciclista = await aluguelServiceApi.getCiclistaById(ciclistaId);
	const meioDePagamento = await aluguelServiceApi.getCartaoDeCreditoByCiclistaId(ciclistaId);
	return {
		nome: ciclista.nome,
		email: ciclista.email,
		meioDePagamento: meioDePagamento,
	};
};

const createCustomer = async (email, name) => {
	try {
		const customer = await stripe.customers.create({
			email,
			name,
		});

		return customer.id;
	} catch (error) {
		console.log(error);
		throw new Error("Erro ao criar o cliente");
	}
};

const addCardToCustomer = async (customerId, tokenId) => {
	try {
		const card = await stripe.customers.createSource(customerId, {
			source: tokenId,
		});

		return card.id;
	} catch (error) {
		console.log(error);
		throw new Error("Erro ao adicionar o cartão ao cliente");
	}
};

const chargeCustomer = async (customerId, tokenId, amount, email) => {
	try {
		return await stripe.charges.create({
			amount: amount,
			currency: "brl",
			customer: customerId,
			source: tokenId,
		});
	} catch (error) {
		console.log(error);
		throw new Error("Erro ao cobrar o cliente");
	}
};

const buildResponse = async (
	status,
	valor,
	ciclista,
	horaSolicitacao,
	incluiCartao
) => {
	const response = {
		id: uuid.v4(),
		status,
		horaSolicitacao,
		horaFinalizacao: new Date().toISOString(),
		valor,
		ciclista,
	};
	if (incluiCartao) {
		response.ultimos4Digitos =
			infoPagamentoCiclista.meioDePagamento.numero.slice(-4);
		response.email = infoPagamentoCiclista.email;
	}
	return response;
};

module.exports = {
	realizarCobranca,
	createCustomer,
	addCardToCustomer,
	chargeCustomer,
	buildResponse,
};
