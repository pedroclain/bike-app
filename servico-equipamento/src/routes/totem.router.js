const express = require("express");
const { totemController } = require("../controller");

const router = express.Router();

router.post("/totem", async (req, res) => {
	totemController.cadastrarTotem(req, res);
});

router.get("/totem", async (req, res) => {
	totemController.buscarTotens(req, res);
});

module.exports = router;
