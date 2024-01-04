const { sequelize } = require("../conf");
const { DataTypes, Model } = require("sequelize");

class Funcionario extends Model {
}

Funcionario.init(
	{
    matricula: {
      type: DataTypes.STRING,
			allowNull: false,
      primaryKey: true,
      defaultValue: sequelize.Sequelize.literal("nextval('funcionario_id')"),
		},
		senha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		confirmacaoSenha: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		idade: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
    funcao: {
			type: DataTypes.ENUM(['Reparador']),
			allowNull: false,
		},
		cpf: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		tableName: "funcionario",
		modelName: "funcionario",
		timestamps: false,
		underscored: true,
		underscoredAll: true,
	}
);

module.exports = Funcionario;
