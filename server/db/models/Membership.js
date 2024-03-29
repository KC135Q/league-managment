const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');
const attributeData = require('../seeds/attributes.json');

const Group = require('./Group');
const Member = require('./Member');

class Membership extends Model {}

Membership.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    memberId: {
      type: DataTypes.INTEGER,
      references: {
        model: Member,
        key: 'id',
      },
    },
    groupId: {
      type: DataTypes.INTEGER,
      references: {
        model: Group,
        key: 'id',
      },
    },
    attributes: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [`${attributeData[0].attributeName || 'None'}`],
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'membership',
    schema: 'member_schema',
  }
);

module.exports = Membership;
