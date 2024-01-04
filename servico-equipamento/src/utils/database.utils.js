const { sequelize } = require("../conf");
const { Bicicleta, Tranca, Totem } = require("../models");

const authenticate = async () => {
	try {
		await sequelize.authenticate();
	} catch (error) {
		console.error("Falhou ao se conectar com banco de dados: ", error);
	}
};

const synchronize = async () => {
	try {
		await sequelize.query("CREATE SEQUENCE IF NOT EXISTS bicicleta_id start 6 increment 1");
		await sequelize.query("CREATE SEQUENCE IF NOT EXISTS tranca_id start 7 increment 1");
		await sequelize.query("CREATE SEQUENCE IF NOT EXISTS totem_id start 2 increment 1");

    await sequelize.query("ALTER SEQUENCE bicicleta_id RESTART WITH 6");
    await sequelize.query("ALTER SEQUENCE tranca_id RESTART WITH 7");
    await sequelize.query("ALTER SEQUENCE totem_id RESTART WITH 2");

    await Totem.sync({ force: true });
		await Bicicleta.sync({ force: true });
		await Tranca.sync({ force: true });

	} catch (error) {
		console.error("Falhou ao sincronizar com banco de dados: ", error);
	}
};

const restoreData = async () => {
	try {
		await Totem.truncate({ cascade: true });
		await Bicicleta.truncate({ cascade: true });
		await Tranca.truncate({ cascade: true });
		await restoreTotemData();
		await restoreBicicletaData();
		await restoreTrancaData();
	} catch (error) {
		console.error("Falhou ao restaurar dados: ", error);
	}
};

const restoreBicicletaData = async () => {
	await Bicicleta.bulkCreate([
		{
			id: 1,
			marca: "Caloi",
			modelo: "Caloi",
			ano: 2020,
			numero: 12345,
			status: "DISPONIVEL",
		},
		{
			id: 2,
			marca: "Caloi",
			modelo: "Caloi",
			ano: 2020,
			numero: 12345,
			status: "REPARO_SOLICITADO",
		},
		{
			id: 3,
			marca: "Caloi",
			modelo: "Caloi",
			ano: 2020,
			numero: 12345,
			status: "EM_USO",
		},
		{
			id: 4,
			marca: "Caloi",
			modelo: "Caloi",
			ano: 2020,
			numero: 12345,
			status: "EM_REPARO",
		},
		{
			id: 5,
			marca: "Caloi",
			modelo: "Caloi",
			ano: 2020,
			numero: 12345,
			status: "EM_USO",
		},
	]);
};

const restoreTrancaData = async () => {
	await Tranca.bulkCreate([
		{
			id: 1,
			localizacao: "Rio de Janeiro",
			numero: 12345,
			anoDeFabricacao: "2020",
			modelo: "Caloi",
			status: "OCUPADA",
			bicicleta: 1,
			totem: 1,
		},
		{
			id: 2,
			localizacao: "Rio de Janeiro",
			numero: 12345,
			anoDeFabricacao: "2020",
			modelo: "Caloi",
			status: "DISPONIVEL",
			totem: 1,
		},
		{
			id: 3,
			localizacao: "Rio de Janeiro",
			numero: 12345,
			anoDeFabricacao: "2020",
			modelo: "Caloi",
			status: "OCUPADA",
			bicicleta: 2,
			totem: 1,
		},
		{
			id: 4,
			localizacao: "Rio de Janeiro",
			numero: 12345,
			anoDeFabricacao: "2020",
			modelo: "Caloi",
			status: "OCUPADA",
			bicicleta: 5,
			totem: 1,
		},
		{
			id: 5,
			localizacao: "Rio de Janeiro",
			numero: 12345,
			anoDeFabricacao: "2020",
			modelo: "Caloi",
			status: "EM_REPARO",
		},
		{
			id: 6,
			localizacao: "Rio de Janeiro",
			numero: 12345,
			anoDeFabricacao: "2020",
			modelo: "Caloi",
			status: "REPARO_SOLICITADO",
			totem: 1,
		},
	]);
};

const restoreTotemData = async () => {
	await Totem.bulkCreate([
		{
			id: 1,
			localizacao: "Rio de Janeiro",
			descricao: "Caloi",
		},
	]);
};

module.exports = {
	authenticate,
	synchronize,
	restoreData,
};
