const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Attribute extends Model {}

Attribute.init(
  {
    attributeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'attribute',
    schema: 'member_schema',
  }
);

module.exports = Attribute;
