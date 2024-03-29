const Attribute = require('./Attribute');
const Group = require('./Group');
const Member = require('./Member');
const Membership = require('./Membership');
const Policy = require('./Policy');
const SuperAdmin = require('./SuperAdmin');

Group.belongsToMany(Member, { through: Membership });
Member.belongsToMany(Group, { through: Membership });

module.exports = {
  Attribute,
  Membership,
  Group,
  Member,
  Policy,
  SuperAdmin,
};
