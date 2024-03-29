const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Policy extends Model {}

Policy.init(
  {
    policyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'policy',
    schema: 'member_schema',
  }
);

module.exports = Policy;
