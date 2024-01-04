const express = require("express");
const { trancaController } = require("../controller");

const router = express.Router();

router.post("/tranca", async (req, res) => {
	trancaController.cadastrarTranca(req, res);
});

router.get("/tranca/:id", async (req, res) => {
	trancaController.buscarTrancaPorId(req, res);
});

router.post("/tranca/retirarDaRede", async (req, res) => {
	trancaController.removerDaRede(req, res);
});

router.post("/tranca/integrarNaRede", async (req, res) => {
	trancaController.integrarNaRede(req, res);
});

router.post("/tranca/:id/status/:status", async (req, res) => {
	trancaController.trocarStatus(req, res);
});

module.exports = router;
