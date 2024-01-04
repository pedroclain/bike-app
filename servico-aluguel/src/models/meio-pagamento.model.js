const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class MeioDePagamento extends Model {
	atualizarDados({ nomeTitular, numero, validade, cvv }) {
    if (nomeTitular) this.nomeTitular = nomeTitular;
    if (numero) this.numero = numero;
    if (validade) this.validade = validade;
    if (cvv) this.cvv = cvv;
  }
}

MeioDePagamento.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			defaultValue: sequelize.Sequelize.literal("nextval('meio_pagamento_id')"),
		},
		numero: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nomeTitular: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		validade: {
			type: DataTypes.STRING,
		},
		cvv: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "meio_pagamento",
		modelName: "meio_pagamento",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = MeioDePagamento;
