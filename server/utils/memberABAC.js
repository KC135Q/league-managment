const { Group, Member, Membership, SuperAdmin } = require("../db/models");
const { verifyToken } = require("./auth");
const { invalidToken, expiredToken, noTokenProvided } = require("./strings");
const { Op } = require("sequelize");

const checkForSuperAdmin = (memberId) => {
  return SuperAdmin.findOne({
    where: {
      memberId: memberId,
    },
  }).then((result) => Boolean(result));
};

/**
 * @author Dan Kaltenbaugh<d.a.kaltenbaugh@gmail.com>
 * @param {*} req
 * @returns whereCondition and allMemberIds
 *  whereCondition is used to filter the query
 *  allMemberIds is used to only allow the query by super admin or gropu admin
 * the current member belongs to or the member themsleves
 */
const setWhereCondition = (req) => {
  let whereCondition = {};
  const allMemberIds = [];
  if (!req.memberAccess.superAdmin) {
    allMemberIds.push(...req.memberAccess.members.get("write"));

    whereCondition = {
      id: {
        [Op.in]: allMemberIds,
      },
    };
  }

  return whereCondition;
};

const setMemberAccess = async (req, res, next) => {
  const memberAccess = {
    memberId: -1,
    superAdmin: false,
    groups: {
      readGroups: [], // Read only
      writeGroups: [], // Create, Read, Update, and Delete (full CRUD)
    },
    members: new Map(), // CRUD members
  };
  try {
    // get jwt token from headers, if it isn't there return 401
    if (!req.headers.authorization) {
      return res.status(401).json({ error: noTokenProvided });
    }
    const token = req.headers.authorization.split(" ")[1];
    /**
     * Verify the token
     * - Includes decoding the token to return the payload
     * - Returns an Error object if the token is invalid
     */
    const verifiedToken = await verifyToken(token);

    // Check to see if the token exists and has a memberId associated with it
    if (verifiedToken instanceof Error || !verifiedToken.memberId) {
      return res.status(401).json({ error: invalidToken });
    }

    const currentTimestamp = Math.floor(Date.now() / 1000);

    if (verifiedToken.exp && verifiedToken.exp < currentTimestamp) {
      return res.status(401).json({ error: expiredToken });
    }

    memberAccess.memberId = verifiedToken.memberId;

    // Add the member to the self group - used when querying for a single member that is the current member
    memberAccess.members.set("write", [verifiedToken.memberId]);

    memberAccess.superAdmin = await checkForSuperAdmin(memberAccess.memberId);

    if (memberAccess.superAdmin) {
      req.memberAccess = memberAccess;
      next();
    } else {
      const member = await Member.findByPk(memberAccess.memberId, {
        include: [{ model: Group, through: "Membership" }],
      });

      if (member && member.groups) {
        const memberPromises = member.groups.map(async (group) => {
          memberAccess.groups.readGroups.push(group.id);
          // select members from the groups
          if (group.membership.isAdmin) {
            memberAccess.groups.writeGroups = group.childGroupIds
              ? [
                  ...memberAccess.groups.writeGroups,
                  group.id,
                  ...group.childGroupIds,
                ]
              : [...memberAccess.groups.writeGroups, group.id];
          }

          const groupMembers = await Membership.findAll({
            attributes: ["memberId"], // Select only the member_id field
            where: {
              groupId: group.id, // Filter by the specific group_id
            },
            raw: true,
          });
          const memberIdsArray = groupMembers.map(
            (membership) => membership.memberId
          );
          const existingWriteMembers = memberAccess.members.get("write") || []; // Get existing values or an empty array
          const uniqueWriteMembers = [
            ...new Set([...memberIdsArray, ...existingWriteMembers]),
          ]; // Combine and filter out duplicates
          memberAccess.members.set("write", uniqueWriteMembers);
        });
        Promise.all(memberPromises).then(() => {
          req.memberAccess = memberAccess;
          next();
        });
      }
    }
  } catch (error) {
    req.memberAccess = memberAccess;
    next();
  }
};

const isGroupAdmin = (req, groupId = -1) => {
  const intGroupId = parseInt(groupId);
  try {
    return req.memberAccess.superAdmin ||
      req.memberAccess.groups.writeGroups.includes(intGroupId)
      ? true
      : false;
  } catch (error) {
    return false;
  }
};

const isGroupMember = (req, groupId = -1) => {
  const intGroupId = parseInt(groupId);
  try {
    return req.memberAccess.superAdmin ||
      req.memberAccess.groups.readGroups.includes(intGroupId) ||
      req.memberAccess.groups.writeGroups.includes(intGroupId)
      ? true
      : false;
  } catch (error) {
    return false;
  }
};

module.exports = {
  isGroupAdmin,
  isGroupMember,
  setMemberAccess,
  setWhereCondition,
};
