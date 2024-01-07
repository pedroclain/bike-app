"use strict";

const routes = require("express").Router();

const emailController = require("../controllers/enviarEmailController");
const validaCartaoController = require("../controllers/validaCartaoController");
const cobrancasController = require("../controllers/cobrancasController");
const cobrancaMiddleware = require("../middlewares/cobrancaMiddleware");

routes.post("/enviarEmail", emailController.enviarEmail);
routes.post(
	"/cobranca",
	cobrancaMiddleware.realizarCobranca,
	cobrancasController.realizarCobranca
);
routes.get("/cobranca/:id", cobrancasController.obterCobranca);
routes.post("/validaCartaoDeCredito", validaCartaoController.validarCartao);

module.exports = routes;
