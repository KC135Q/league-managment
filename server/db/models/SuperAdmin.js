const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const Member = require('./Member');

class SuperAdmin extends Model {}

SuperAdmin.init(
  {
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Member,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'super_admin',
    schema: 'public',
  }
);

SuperAdmin.belongsTo(Member, { foreignKey: 'memberId' });

module.exports = SuperAdmin;
