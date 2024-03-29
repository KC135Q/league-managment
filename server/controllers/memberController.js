const { Op } = require("sequelize");
const { Member, Group } = require("../db/models");
const { setWhereCondition } = require("../utils/memberABAC");

const {
  badRequest,
  resourceNotFound,
  updateSuccess,
} = require("../utils/strings");

/**
 * @author Dan Kaltenbaugh<d.a.kaltenbaugh@gmail.com>
 * @description Adds a member to the database without requiring a token or authorization.
 *   This is used for adding members to the database when they sign up and puts a 'pending' status on
 *   the member. The member is then added to a Group by a super admin or group admin after verifying their email.
 * @param {*} req
 * @returns
 */
const addMember = async (req) => {
  try {
    const response = { status: 200, data: {} };

    const memberData = await Member.create(req.body);

    if (!memberData) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
    } else {
      response.data = memberData;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const deleteMember = async (req) => {
  try {
    const response = { status: 200, data: {} };
    const whereCondition = setWhereCondition(req);
    const memberData = await Member.destroy({
      where: {
        [Op.and]: [
          whereCondition,
          {
            id: req.params.id,
          },
        ],
      },
    });
    if (!memberData) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
    } else {
      response.data = memberData;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const getAllMembers = async (req) => {
  const response = { status: 200, data: {} };
  const whereCondition = setWhereCondition(req);
  try {
    const membersWithGroups = await Member.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: whereCondition,
      include: {
        model: Group,
      },
    });

    if (!membersWithGroups) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
    } else {
      response.data = membersWithGroups;
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const getMemberById = async (req) => {
  try {
    const response = { status: 200, data: {} };
    const whereCondition = setWhereCondition(req);
    /**
     * Make sure that the reqest is coming from an authorized member
     * - whereCondition is set to an empty object if the member is a super admin
     * - whereCondition is set to an object with an array of allowed member ids
     *  if the member is not a super admin
     * - finally, the query executes on the id passed in the request params
     */
      const memberData = await Member.findOne({
        where: {
          [Op.and]: [
            whereCondition,
            {
              id: req.params.id,
            },
          ],
        },
        attributes: {
          exclude: ["password"],
        },
        include: Group,
      });

      if (memberData) {
        response.data = memberData;

        return response;
      } else {
        // If the member does not exist or memberData not found, return a 404
        const error = new Error(resourceNotFound.message);
        error.status = 404;
        throw error;
      }
    // } else {
    //   // If the member does not exist or memberData not found, return a 404
    //   const error = new Error(resourceNotFound.message);
    //   error.status = 404;
    //   throw error;
    // }
  } catch (error) {
    throw error;
  }
};

const updateMemberById = async (req) => {
  const response = { status: 200, data: {} };
  const accessMemberIds = req.memberAccess.members.get("write");
  try {
    if (
      !accessMemberIds.includes(parseInt(req.params.id)) &&
      !req.memberAccess.superAdmin
    ) {
      response.status = 403;
      response.data = {
        error: badRequest.error,
        message: badRequest.message,
      };
    } else {
      const [updatedRowsCount] = await Member.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
      if (updatedRowsCount === 0) {
        response.status = 404;
        response.data = {
          error: resourceNotFound.error,
          message: resourceNotFound.message,
        };
      } else {
        response.data = { message: updateSuccess };
      }
    }
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addMember,
  deleteMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
};
