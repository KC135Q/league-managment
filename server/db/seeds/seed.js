require('dotenv').config()
const sequelize = require('../../config/database');
const {
  Attribute,
  Group,
  Membership,
  Member,
  Policy,
  SuperAdmin,
} = require('../models');

const attributeData = require('./attributes.json');
const groupData = require('./groups.json');
const memberData = require('./members.json');
const policyData = require('./policies.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Member.bulkCreate(memberData, {
    individualHooks: true,
    returning: true,
  });

  await Group.bulkCreate(groupData, {
    individualHooks: true,
    returning: true,
  });

  await Attribute.bulkCreate(attributeData, {
    individualHooks: true,
    returning: true,
  });

  await Policy.bulkCreate(policyData, {
    individualHooks: true,
    returning: true,
  });

  await SuperAdmin.create(
    {
      memberId: 1,
    },
    {
      individualHooks: true,
      returning: true,
    }
  );

  await Membership.create(
    {
      memberId: 2,
      groupId: 1,
      isAdmin: false,
    },
    {
      individualHooks: true,
      returning: true,
    }
  );

  await Membership.create(
    {
      memberId: 2,
      groupId: 7,
      isAdmin: true,
    },
    {
      individualHooks: true,
      returning: true,
    }
  );

  await Membership.create(
    {
      memberId: 3,
      groupId: 7,
      isAdmin: true,
    },
    {
      individualHooks: true,
      returning: true,
    }
  );

  await Membership.create(
    {
      memberId: 4,
      groupId: 7,
    },
    {
      individualHooks: true,
      returning: true,
    }
  );

  process.exit(0);
};

seedDatabase();
