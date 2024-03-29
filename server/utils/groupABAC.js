const { Op } = require("sequelize");

const groupWhereCondition = (req, type = "read") => {
  let whereCondition = {};

  if (!req.memberAccess.superAdmin) {
    const groupArray =
      type === "read"
        ? req.memberAccess.groups.readGroups
        : req.memberAccess.groups.writeGroups;
    whereCondition = {
      id: {
        [Op.in]: groupArray || [],
      },
    };
  }
  return whereCondition;
};

module.exports = {
  groupWhereCondition,
};
