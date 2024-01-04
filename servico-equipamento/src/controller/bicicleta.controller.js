const { Bicicleta, Tranca } = require("../models");

const cadastrarBicicleta = async (req, res) => {
	const { marca, ano, modelo, numero, status } = req.body;

	if (!numero || !marca || !ano || !modelo || !status) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const novaBicicleta = await Bicicleta.create({
			numero,
			marca,
			ano,
			modelo,
			status,
		});

		res.status(201).json(novaBicicleta);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const buscarBicicletaPorId = async (req, res) => {
	const { id } = req.params;

	try {
		const totem = await Bicicleta.findOne({
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
	const { idTranca, idBicicleta, idFuncionario } = req.body;

	if (!idTranca || !idBicicleta || !idFuncionario) {
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
		const bicicleta = await Bicicleta.findOne({
			where: { id: idBicicleta },
		});

    if (bicicleta.podeIntegrarNaRede() && tranca.podeAcoplarBicicleta()) {
      bicicleta.integrarNaRede();
      tranca.acoplarBicicleta(bicicleta);
      await bicicleta.save();
      await tranca.save();
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
	const { idTranca, idBicicleta, idFuncionario, statusAcaoReparador } = req.body;

	if (!idTranca || !idBicicleta || !idFuncionario || !statusAcaoReparador) {
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
		const bicicleta = await Bicicleta.findOne({
			where: { id: idBicicleta },
		});

    if (bicicleta.podeRemoverDaRede() && tranca.podeDesacoplarBicicleta()) {
      bicicleta.removerDaRede(statusAcaoReparador);
      tranca.desacoplarBicicleta();
      await bicicleta.save();
      await tranca.save();
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
		const bicicleta = await Bicicleta.findOne({
			where: { id },
		});

    bicicleta.trocarStatus(status)
    
    await bicicleta.save();    

    res.sendStatus(200);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	cadastrarBicicleta,
	buscarBicicletaPorId,
	integrarNaRede,
  removerDaRede,
  trocarStatus
};
