const express = require("express");
const { ciclistaController } = require("../controller");

const router = express.Router();

router.post("/ciclista", async (req, res) => {
	ciclistaController.cadastrarCiclista(req, res);
});

router.get("/ciclista/:id", async (req, res) => {
	ciclistaController.buscarCiclistaPorId(req, res);
});

router.put("/ciclista/:id", async (req, res) => {
	ciclistaController.atualizarCiclista(req, res);
});

router.post("/ciclista/:id/ativar", async (req, res) => {
	ciclistaController.ativarCiclista(req, res);
});

module.exports = router;
