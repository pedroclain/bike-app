const { sequelize } = require("../conf");
const {
	Ciclista,
	MeioDePagamento,
	Passaporte,
	Aluguel,
	Funcionario,
} = require("../models");

const authenticate = async () => {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.error("Falhou ao se conectar com banco de dados: ", error);
	}
};

const synchronize = async () => {
	try {
		await sequelize.query(
			"CREATE SEQUENCE IF NOT EXISTS ciclista_id start 5 increment 1"
		);
		await sequelize.query(
			"CREATE SEQUENCE IF NOT EXISTS passaporte_id start 5 increment 1"
		);
		await sequelize.query(
			"CREATE SEQUENCE IF NOT EXISTS meio_pagamento_id start 5 increment 1"
		);
		await sequelize.query(
			"CREATE SEQUENCE IF NOT EXISTS funcionario_matricula start 2 increment 1"
		);
		await sequelize.query(
			"CREATE SEQUENCE IF NOT EXISTS aluguel_id start 3 increment 1"
		);

		await sequelize.query("ALTER SEQUENCE ciclista_id RESTART WITH 5");
		await sequelize.query("ALTER SEQUENCE passaporte_id RESTART WITH 5");
		await sequelize.query("ALTER SEQUENCE meio_pagamento_id RESTART WITH 5");
		await sequelize.query(
			"ALTER SEQUENCE funcionario_matricula RESTART WITH 2"
		);
		await sequelize.query("ALTER SEQUENCE aluguel_id RESTART WITH 3");

		await Passaporte.sync({ force: true });
		await MeioDePagamento.sync({ force: true });
		await Ciclista.sync({ force: true });
		await Funcionario.sync({ force: true });
		await Aluguel.sync({ force: true });
	} catch (error) {
		console.error("Falhou ao sincronizar com banco de dados: ", error);
	}
};

const restoreData = async () => {
	try {
		await Ciclista.truncate({ cascade: true });
		await MeioDePagamento.truncate({ cascade: true });
		await Passaporte.truncate({ cascade: true });
		await Funcionario.truncate({ cascade: true });
		await Aluguel.truncate({ cascade: true });
		await restoreMeioPagamentoData();
		await restoreCiclistaData();
		await restoreFuncionarioData();
		await restoreAluguelData();
	} catch (error) {
		console.error("Falhou ao restaurar dados: ", error);
	}
};

const restoreCiclistaData = async () => {
	await Ciclista.bulkCreate([
		{
			id: 1,
			status: "CONFIRMADO",
			nome: "Fulano Beltrano",
			nascimento: "2021-05-02",
			cpf: "78804034009",
			nacionalidade: "Brasileiro",
			email: "user@example.com",
			senha: "ABC123",
			meioDePagamento: 1,
		},
		{
			id: 2,
			status: "AGUARDANDO_CONFIRMACAO",
			nome: "Fulano Beltrano",
			nascimento: "2021-05-02",
			cpf: "43943488039",
			nacionalidade: "Brasileiro",
			email: "user2@example.com",
			senha: "ABC123",
			meioDePagamento: 1,
		},
    {
			id: 3,
			status: "CONFIRMADO",
			nome: "Fulano Beltrano",
			nascimento: "2021-05-02",
			cpf: "10243164084",
			nacionalidade: "Brasileiro",
			email: "user3@example.com",
			senha: "ABC123",
			meioDePagamento: 1,
		}
	]);
};

const restoreMeioPagamentoData = async () => {
	await MeioDePagamento.bulkCreate([
		{
			id: 1,
			nomeTitular: "Fulano Beltrano",
			numero: "4012001037141112",
			validade: "2030-12",
			cvv: "123",
		},
	]);
};

const restoreFuncionarioData = async () => {
	await Funcionario.bulkCreate([
		{
			id: 1,
			matricula: "12345",
			nome: "Beltrano",
			cpf: "99999999999",
			email: "employee@example.com",
			senha: "123",
			confirmacaoSenha: "123",
			idade: 25,
			funcao: "Reparador",
		},
	]);
};

const restoreAluguelData = async () => {
	await Aluguel.bulkCreate([
		{
			id: 3,
      ciclista: 3,
			bicicleta: 3,
			trancaInicio: 2,
			cobranca: "1954c01c-8099-4256-91ac-63ad2b4549cf",
			horaInicio: new Date(),
		},
	]);
};

module.exports = {
	authenticate,
	synchronize,
	restoreData,
};
