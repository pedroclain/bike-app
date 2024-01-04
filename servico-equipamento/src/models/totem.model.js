const { DataTypes, Model } = require("sequelize");
const { sequelize } = require('../conf')

class Totem extends Model {
}

Totem.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: sequelize.Sequelize.literal("nextval('totem_id')")
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
{
  sequelize,
  modelName: "totem",
  tableName: "totem",
  timestamps: false,
  underscored: true,
  underscoredAll: true,
});

module.exports = Totem;