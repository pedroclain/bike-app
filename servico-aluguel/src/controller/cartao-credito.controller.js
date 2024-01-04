const { Ciclista, Passaporte } = require("../models");
const { MeioDePagamento } = require("../models");
const { servicoExterno } = require("../service");

const buscarCartaoPorIdCiclista = async (req, res) => {
	const { idCiclista } = req.params;

	try {
		const ciclista = await Ciclista.findOne({
			where: { id: idCiclista },
		});
		const cartao = await MeioDePagamento.findOne({
			where: { id: ciclista.meioDePagamento },
		});

		res.status(200).json(cartao);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const atualizarCartao = async (req, res) => {
	const { idCiclista } = req.params;
	const {
		nomeTitular,
		numero,
		validade,
		cvv,
	} = req.body;

	try {
		const ciclista = await Ciclista.findOne({
			where: { id: idCiclista },
		});
    const cartao = await MeioDePagamento.findOne({
			where: { id: ciclista.meioDePagamento },
		});
		cartao.atualizarDados({
      nomeTitular,
      numero,
      validade,
      cvv
    })

    await cartao.save();

		res.status(200).json(cartao.dataValues);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	buscarCartaoPorIdCiclista,
	atualizarCartao,
};
