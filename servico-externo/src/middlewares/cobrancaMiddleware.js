const { cobrancaSchema } = require("../routes/schemas/cobrancasSchema");

var validate = require("jsonschema").validate;

const realizarCobranca = async (req, res, next) => {
	const { valor, ciclista } = req.body;

	const result = validate({ valor, ciclista }, cobrancaSchema);

	if (!result.valid) {
		const errors = result.errors.map((e) => e.argument);
		res.json({
			mensagem: "Campos inválidos",
			campos: errors,
		});

		return;
	}

	next();
};

module.exports = {
	realizarCobranca,
};
