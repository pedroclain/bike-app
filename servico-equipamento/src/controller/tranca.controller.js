const { Tranca } = require("../models");

const cadastrarTranca = async (req, res) => {
	const { numero, localizacao, anoDeFabricacao, modelo, status } = req.body;

	if (!numero || !localizacao || !anoDeFabricacao || !modelo || !status) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const novaTranca = await Tranca.create({
			numero,
			localizacao,
			anoDeFabricacao,
			modelo,
			status,
		});

		res.status(201).json(novaTranca);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const buscarTrancaPorId = async (req, res) => {
	const { id } = req.params;

	try {
		const totem = await Tranca.findOne({
			where: { id },
		});

		res.status(200).json(totem);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const integrarNaRede = async (req, res) => {
	const { idTranca, idTotem, idFuncionario } = req.body;

	if (!idTranca || !idTotem || !idFuncionario) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const tranca = await Tranca.findOne({
			where: { id: idTranca },
		});

    if (tranca.podeIntegrarNaRede()) {
      tranca.integrarNaRede(idTotem);
      tranca.save();
      res.sendStatus(200);
      return;
    }

    res.status(422).json([{ codigo: 422, mensagem: "Operação invalida"}])
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const removerDaRede = async (req, res) => {
	const { idTranca, idTotem, idFuncionario, statusAcaoReparador } = req.body;

	if (!idTranca || !idTotem || !idFuncionario || !statusAcaoReparador) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const tranca = await Tranca.findOne({
			where: { id: idTranca },
		});

		if (tranca.podeRemoverDaRede()) {
			tranca.removerDaRede(statusAcaoReparador);
			tranca.save();
			res.sendStatus(200);
			return;
		}

		res.status(422).json([{ codigo: 422, mensagem: "Operação invalida" }]);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const trocarStatus = async (req, res) => {
	const { id, status } = req.params;

	if (!status || !id) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const tranca = await Tranca.findOne({
			where: { id },
		});

    tranca.trocarStatus(status)
    
    await tranca.save();    

    res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	cadastrarTranca,
	buscarTrancaPorId,
  integrarNaRede,
  removerDaRede,
  trocarStatus
};
