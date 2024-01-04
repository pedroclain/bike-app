const express = require("express");
const { aluguelController } = require("../controller");

const router = express.Router();

router.post("/aluguel", async (req, res) => {
	aluguelController.alugarBicicleta(req, res);
});

router.post("/devolver", async (req, res) => {
	aluguelController.devolverBicicleta(req, res);
});

module.exports = router;
