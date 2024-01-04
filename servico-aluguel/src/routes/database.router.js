const express = require("express");
const { database } = require("../utils");

const router = express.Router();

router.get("/restaurarDados", async (req, res) => {
	try {
		await database.restoreData();
		res.sendStatus(200);
	} catch (err) {
		res
			.status(500)
			.json([{ codigo: 500, mensagem: "Um erro inesperado ocorreu" }]);
	}
});

module.exports = router;
