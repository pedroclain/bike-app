const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class Cobranca extends Model {}

Cobranca.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
      autoIncrement: true
		},
		status: {
			type: DataTypes.ENUM(
				"PENDENTE",
				"CONFIRMADO",
			),
		},
		horaSolicitacao: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		valor: {
			type: DataTypes.DECIMAL(5,2),
			allowNull: false,
		},
		ciclista: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "cobranca",
		modelName: "cobranca",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Cobranca;
