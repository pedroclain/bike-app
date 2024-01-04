const { Totem } = require("../models");

const cadastrarTotem = async (req, res) => {
	const { localizacao, descricao } = req.body;

	if (!localizacao || !descricao) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const novoTotem = await Totem.create({
			localizacao,
			descricao,
		});

		res.status(201).json(novoTotem);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const buscarTotens = async (req, res) => {
	try {
		const totem = await Totem.findAll();

		res.status(200).json(totem);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	cadastrarTotem,
	buscarTotens,
};
