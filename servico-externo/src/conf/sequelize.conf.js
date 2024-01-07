require("dotenv").config();
const { Sequelize } = require("sequelize");
const logger = require("../utils/logUtils");

const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		port: process.env.DB_PORT,
		dialect: process.env.DB_DIALECT,
    logging: (msg) => logger.debug(msg)
	}
);

module.exports = sequelize;
