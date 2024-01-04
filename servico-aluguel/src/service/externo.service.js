const axios = require("axios");

const sendEmail = async (email, assunto, mensagem) => {
	await axios.post(`${process.env.URL_EXTERNO}/enviarEmail`, {
		email,
		assunto,
		mensagem,
	});
};

const realizarCobranca = async (ciclista, valor) => {
	const response = await axios.post(`${process.env.URL_EXTERNO}/cobranca`, {
		ciclista,
		valor,
	});

  return response.data.id;
};

module.exports = {
	sendEmail,
  realizarCobranca
};
