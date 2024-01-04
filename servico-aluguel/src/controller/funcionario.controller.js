const Funcionario = require("../models/funcionario.model");

const cadastrarFuncionario = async (req, res) => {
	const { 
    senha,
    confirmacaoSenha,
    email,
    nome,
    idade,
    funcao,
    cpf
   } = req.body;

	try {
		const novoFuncionario = await Funcionario.create({
			senha,
      confirmacaoSenha,
      email,
      nome,
      idade,
      funcao,
      cpf
		});

		const result = { ...novoFuncionario.dataValues };

		res.status(201).json(result);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

const buscarFuncionarioPorId = async (req, res) => {
	const { matricula } = req.params;

  try {
		const funcionario = await Funcionario.findOne({
			where: { matricula },
		});

		res.status(200).json(funcionario);
	} catch (err) {
		console.error(err);
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
};

module.exports = {
	cadastrarFuncionario,
  buscarFuncionarioPorId
};
