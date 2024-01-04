const axios = require("axios");
const { Tranca } = require("../models");

const buscarTranca = async (id) => {
	const url = new URL(`${process.env.URL_EQUIPAMENTO}/tranca/${id}`).toString();
	const response = await axios.get(url);
	return new Tranca(response.data);
};

const trocarStatusTranca = async (idTranca, status) => {
	const url = new URL(
		`${process.env.URL_EQUIPAMENTO}/tranca/${idTranca}/status/${status}`
	).toString();
	await axios.post(url);
};

const trocarStatusBicicleta = async (idBicicleta, status) => {
	const url = new URL(
		`${process.env.URL_EQUIPAMENTO}/bicicleta/${idBicicleta}/status/${status}`
	).toString();
	await axios.post(url);
};

module.exports = {
	buscarTranca,
  trocarStatusTranca,
  trocarStatusBicicleta
};
