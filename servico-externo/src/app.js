"use strict";

const express = require("express");

const build = () => {
	const app = express();
  
  app.use(express.json())
	app.use(require("./routes/transactionsRoutes"));
	return app;
};

module.exports = {
	build,
};
