const { sequelize } = require("../conf");
const { Model, DataTypes } = require("sequelize");

class Bicicleta extends Model {
	podeIntegrarNaRede() {
		if (this.status !== "EM_REPARO" && this.status !== "NOVA") {
			return false;
		}

		return true;
	}

	integrarNaRede() {
		if (this.podeIntegrarNaRede()) {
			this.status = "DISPONIVEL";
		}
	}

	podeRemoverDaRede() {
		if (this.status !== "DISPONIVEL") {
			return false;
		}

		return true;
	}

	removerDaRede(acao) {
		if (this.podeRemoverDaRede()) {
			this.status = acao;
		}
	}

  trocarStatus(novoStatus) {
    this.status = novoStatus;
  }
}

Bicicleta.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			defaultValue: sequelize.Sequelize.literal("nextval('bicicleta_id')"),
		},
		marca: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		modelo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		ano: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		numero: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM(
				"DISPONIVEL",
				"EM_USO",
				"NOVA",
				"APOSENTADA",
				"REPARO_SOLICITADO",
				"EM_REPARO"
			),
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "bicicleta",
		tableName: "bicicleta",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Bicicleta;
