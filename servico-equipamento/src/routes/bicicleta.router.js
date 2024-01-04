const express = require("express");
const { bicicletaController } = require("../controller");

const router = express.Router();

router.post("/bicicleta", async (req, res) => {
	bicicletaController.cadastrarBicicleta(req, res);
});

router.get("/bicicleta/:id", async (req, res) => {
	bicicletaController.buscarBicicletaPorId(req, res);
});

router.post("/bicicleta/integrarNaRede", async (req, res) => {
	bicicletaController.integrarNaRede(req, res);
});

router.post("/bicicleta/retirarDaRede", async (req, res) => {
	bicicletaController.removerDaRede(req, res);
});

router.post("/bicicleta/:id/status/:status", async (req, res) => {
	bicicletaController.trocarStatus(req, res);
});

module.exports = router;
