const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class Ciclista extends Model {
	adicionarMeioPagamento(meioDePagamento) {
		this.meioDePagamento = meioDePagamento.id;
	}

	atualizarDados({
		nome,
		nascimento,
		cpf,
		passaporte,
		nacionalidade,
		email,
		urlFotoDocumento,
	}) {
		if (nome) this.nome = nome;
		if (nascimento) this.nascimento = nascimento;
		if (cpf) this.cpf = cpf;
		if (passaporte) this.passaporte = passaporte.id;
		if (nacionalidade) this.nacionalidade = nacionalidade;
		if (email) this.email = email;
		if (urlFotoDocumento) this.urlFotoDocumento = urlFotoDocumento;
	}

  podeAtivar() {
    return this.status === "AGUARDANDO_CONFIRMACAO";
  }

  ativar() {
    if (this.podeAtivar()) this.status = "CONFIRMADO"
  }
}

Ciclista.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			defaultValue: sequelize.Sequelize.literal("nextval('ciclista_id')"),
		},
		status: {
			type: DataTypes.ENUM("AGUARDANDO_CONFIRMACAO", "CONFIRMADO"),
			allowNull: false,
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		nascimento: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		passaporte: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "passaporte",
				key: "id",
			},
		},
		meioDePagamento: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: "meio_pagamento",
				key: "id",
			},
		},
		nacionalidade: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		urlFotoDocumento: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		sequelize,
		tableName: "ciclista",
		modelName: "ciclista",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Ciclista;
