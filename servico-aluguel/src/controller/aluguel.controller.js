const { Aluguel } = require("../models");
const { servicoExterno, servicoEquipamento } = require("../service");

const alugarBicicleta = async (req, res) => {
	const { ciclista, trancaInicio } = req.body;

	if (!ciclista || !trancaInicio) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const tranca = await servicoEquipamento.buscarTranca(trancaInicio);
		const idCobranca = await servicoExterno.realizarCobranca(ciclista, 10);
		const novoAluguel = await Aluguel.create({
			bicicleta: tranca.bicicleta,
			ciclista,
			trancaInicio: tranca.id,
			horaInicio: new Date(),
			cobranca: idCobranca,
		});
		await servicoEquipamento.trocarStatusTranca(tranca.id, "DISPONIVEL");
		await servicoEquipamento.trocarStatusBicicleta(tranca.bicicleta, "EM_USO");

		res
			.status(200)
			.json({ ...novoAluguel.dataValues, cobrancaExtra: undefined });
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const devolverBicicleta = async (req, res) => {
	const { idTranca, idBicicleta } = req.body;

	if (!idTranca || !idBicicleta) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const aluguel = await Aluguel.findOne({
			where: { horaFim: null, bicicleta: idBicicleta },
		});
		aluguel.devolver({ tranca: idTranca });

		await aluguel.save();
		await servicoEquipamento.trocarStatusTranca(idTranca, "OCUPADA");
		await servicoEquipamento.trocarStatusBicicleta(idBicicleta, "DISPONIVEL");

		res
			.status(200)
			.json({
				...aluguel.dataValues,
				cobrancaExtra: undefined,
				cobranca: aluguel.cobrancaExtra,
			});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	alugarBicicleta,
	devolverBicicleta,
};
