"use strict";

const { sequelize } = require("./conf");
const { build } = require("./app");
const logger = require("./utils/logUtils");

(async () => {
	const server = build();
	const SERVER_PORT = process.env.PORT || 8002;

	await sequelize.authenticate();
  // await Cobranca.sync({ force: true })

	server.listen(SERVER_PORT, () => {
		logger.info(`Servidor rodando na port: ${SERVER_PORT}`);
	});
})();
