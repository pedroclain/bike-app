const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class Passaporte extends Model {}

Passaporte.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			defaultValue: sequelize.Sequelize.literal("nextval('passaporte_id')"),
		},
		numero: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		validade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "passaporte",
		modelName: "passaporte",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Passaporte;
