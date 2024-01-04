const { Ciclista, Passaporte } = require("../models");
const { MeioDePagamento } = require("../models");
const { servicoExterno } = require("../service");

const cadastrarCiclista = async (req, res) => {
	const { ciclista, meioDePagamento } = req.body;

	if (!ciclista || !meioDePagamento) {
		res
			.status(422)
			.json([
				{ codigo: 422, mensagem: "Preencha todos os campos obrigatorios" },
			]);
		return;
	}

	try {
		const novoCiclista = await Ciclista.create({
			...ciclista,
			status: "AGUARDANDO_CONFIRMACAO",
		});
		const novoMeioPagamento = await MeioDePagamento.create({
			...meioDePagamento,
		});

		novoCiclista.adicionarMeioPagamento(novoMeioPagamento);
		await novoCiclista.save();

		await servicoExterno.sendEmail(
			novoCiclista.email,
			"Cadastro de usuário",
			`Você realizou cadastro, acesse o link para ativar sua conta`
		);

		const result = { ...novoCiclista.dataValues, senha: undefined };

		res.status(201).json(result);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const buscarCiclistaPorId = async (req, res) => {
	const { id } = req.params;

	try {
		const ciclista = await Ciclista.findOne({
			where: { id },
		});

		res.status(200).json(ciclista);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const atualizarCiclista = async (req, res) => {
	const { id } = req.params;
	const {
		nome,
		nascimento,
		cpf,
		passaporte,
		nacionalidade,
		email,
		urlFotoDocumento,
	} = req.body;

	try {
		const ciclista = await Ciclista.findOne({
			where: { id },
		});
		let novoPassaporte;

		if (novoPassaporte) {
			await Passaporte.destroy({ where: { id: ciclista.passaporte } });
			novoPassaporte = await Passaporte.create({
				...passaporte,
			});
		}

		ciclista.atualizarDados({
			nome,
			nascimento,
			cpf,
			novoPassaporte,
			nacionalidade,
			email,
			urlFotoDocumento,
		});

		await ciclista.save();

		const result = {
			...ciclista.dataValues,
			senha: undefined,
			meioDePagamento: undefined,
		};

		res.status(200).json(result);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const ativarCiclista = async (req, res) => {
	const { id } = req.params;

	try {
		const ciclista = await Ciclista.findOne({
			where: { id },
		});

		if (ciclista.podeAtivar()) {
			ciclista.ativar();
			await ciclista.save();
			res
				.status(200)
				.json({
					...ciclista.dataValues,
					senha: undefined,
					passaporte: undefined,
				});
			return;
		}

		res.status(422).json({
			codigo: 422,
			mensagem: "Ciclista já foi ativado ou não consta no sistema",
		});
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	cadastrarCiclista,
	buscarCiclistaPorId,
	atualizarCiclista,
	ativarCiclista,
};
