const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class Tranca extends Model {
	podeIntegrarNaRede() {
		if (this.status !== "EM_REPARO" && this.status !== "NOVA") {
			return false;
		}

		return true;
	}

	integrarNaRede(totem) {
		if (this.podeIntegrarNaRede()) {
			this.status = "DISPONIVEL";
			this.totem = totem.id;
		}
	}

	podeAcoplarBicicleta() {
		if (this.status !== "DISPONIVEL") {
			return false;
		}

		return true;
	}

	acoplarBicicleta(bicicleta) {
		if (this.podeAcoplarBicicleta()) {
			this.status = "OCUPADA";
			this.bicicleta = bicicleta.id;
		}
	}

	podeDesacoplarBicicleta() {
		if (this.status !== "OCUPADA" || this.bicicleta == null) {
			return false;
		}

		return true;
	}

	desacoplarBicicleta() {
		if (this.podeDesacoplarBicicleta()) {
			this.bicicleta = null;
			this.status = "DISPONIVEL";
		}
	}

	podeRemoverDaRede() {
		if (this.status !== "REPARO_SOLICITADO") {
			return false;
		}

		return true;
	}

	removerDaRede(acao) {
		if (this.podeRemoverDaRede()) {
			this.status = acao;
			this.totem = null;
		}
	}
  
  trocarStatus(novoStatus) {
    this.status = novoStatus;
  }
}

Tranca.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			defaultValue: sequelize.Sequelize.literal("nextval('tranca_id')"),
		},
		numero: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		localizacao: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		anoDeFabricacao: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		modelo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM(
				"DISPONIVEL",
				"REPARO_SOLICITADO",
				"OCUPADA",
				"NOVA",
				"APOSENTADA",
				"EM_REPARO"
			),
			allowNull: false,
		},
		bicicleta: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "bicicleta",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		},
		totem: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "totem",
				key: "id",
			},
			onUpdate: "CASCADE",
			onDelete: "SET NULL",
		},
	},
	{
		sequelize,
		modelName: "tranca",
		tableName: "tranca",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Tranca;
