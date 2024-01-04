const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class Aluguel extends Model {
	devolver({ cobrancaExtra, tranca }) {
		this.horaFim = new Date();
		this.trancaFim = tranca;
		if (cobrancaExtra) this.cobrancaExtra = cobrancaExtra;
	}
}

Aluguel.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			defaultValue: sequelize.Sequelize.literal("nextval('aluguel_id')"),
		},
		bicicleta: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		ciclista: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "ciclista",
				key: "id",
			},
		},
		trancaInicio: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		trancaFim: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		horaInicio: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		horaFim: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		cobranca: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cobrancaExtra: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "aluguel",
		modelName: "aluguel",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Aluguel;
