const { Op } = require("sequelize");
const { Member, Membership, Group } = require("../db/models");
const { isGroupAdmin, setWhereCondition } = require("../utils/memberABAC");
const {
  accessDenied,
  conflict,
  databaseCreateFailed,
  updateSuccess,
  resourceNotFound,
  memberExistsInGroup,
} = require("../utils/strings");
const { groupWhereCondition } = require("../utils/groupABAC");

const getAllMemberships = async (req) => {
  const response = { status: 200, data: {} };
  try {
    const whereCondition = setWhereCondition(req, "read");
    const memberships = await Member.findAll({
      where: whereCondition,
      include: [
        {
          model: Group,
        },
      ],
    });
    if (!memberships) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
    } else {
      const membershipsWithGroups = memberships.filter((membership) => {
        return membership.dataValues.groups.length > 0;
      });
      response.data = membershipsWithGroups;
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const addMembership = async (req) => {
  const response = { status: 200, data: {} };
  try {
    if (isGroupAdmin(req, parseInt(req.body.groupId))) {
      // see if they are already a member first
      const membershipExists = await Membership.findOne({
        where: {
          memberId: req.body.memberId,
          groupId: req.body.groupId,
        },
      });
      if (membershipExists) {
        // Duplicate entry... return
        response.status = 409;
        response.data = {
          error: conflict,
          message: memberExistsInGroup,
        };
      } else {
        const membershipData = await Membership.create(req.body);
        if (!membershipData) {
          response.status = 404;
          response.data = {
            error: databaseCreateFailed.error,
            message: databaseCreateFailed.message,
          };
        } else {
          response.data = membershipData;
        }
      }

      return response;
    } else {
      response.status = 403;
      response.data = {
        error: accessDenied,
        message: accessDenied,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
}

const getGroupMembers = async (req) => {
  const response = { status: 200, data: {} };
  try {
    const whereCondition = groupWhereCondition(req, "read");
    const groupMembers = await Group.findAll({
      where: {
        [Op.and]: [{ id: req.params.group_id }, whereCondition],
      },
      include: {
        model: Member,
      },
    });
    if (!groupMembers) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
    } else {
      response.data = groupMembers;
    }
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addMembership,
  getAllMemberships,
  getGroupMembers,
};
