const express = require("express");
const { funcionarioController } = require("../controller");

const router = express.Router();

router.post("/funcionario", async (req, res) => {
	funcionarioController.cadastrarFuncionario(req, res);
});

router.get("/funcionario/:matricula", async (req, res) => {
	funcionarioController.buscarFuncionarioPorId(req, res);
});

module.exports = router;
