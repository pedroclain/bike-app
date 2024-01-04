require("dotenv").config();
const express = require("express");
const { databaseRouter, trancaRouter, bicicletaRouter, totemRouter } = require("./routes");
const app = express();

const start = (port = 8000) => {
	app.use(express.json());
	app.use(databaseRouter);
	app.use(trancaRouter);
	app.use(bicicletaRouter);
	app.use(totemRouter);
	app.listen(port, () => {
		console.log(`Server on port ${port}`);
	});
};

module.exports = {
	start,
};
