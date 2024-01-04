const express = require("express");
const { cartaoCreditoController } = require("../controller");

const router = express.Router();


router.get("/cartaoDeCredito/:idCiclista", async (req, res) => {
	cartaoCreditoController.buscarCartaoPorIdCiclista(req, res);
});

router.put("/cartaoDeCredito/:idCiclista", async (req, res) => {
	cartaoCreditoController.atualizarCartao(req, res);
});

module.exports = router;
