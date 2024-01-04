require("dotenv").config();
const express = require("express");
const {
	databaseRouter,
	funcionarioRouter,
	ciclistaRouter,
	cartaoCreditoRouter,
	rootRouter,
} = require("./routes");
const app = express();

const start = (port = 8000) => {
	app.use(express.json());
	app.use(databaseRouter);
	app.use(ciclistaRouter);
	app.use(funcionarioRouter);
	app.use(cartaoCreditoRouter);
	app.use(rootRouter);
	app.listen(port, () => {
		console.log(`Server on port ${port}`);
	});
};

module.exports = {
	start,
};
