const { Op } = require("sequelize");
const { Group } = require("../db/models");
const { isGroupAdmin } = require("../utils/memberABAC");
const { groupWhereCondition } = require("../utils/groupABAC");
const { resourceNotFound } = require("../utils/strings");

const {
  accessDenied,
  databaseCreateFailed,
  updateSuccess,
} = require("../utils/strings");

const addGroup = async (req) => {
  const response = { status: 200, data: {} };
  try {
    if (isGroupAdmin(req, parseInt(req.body.parentGroupId))) {

      const groupData = await Group.create(req.body);

      if (!groupData) {
        response.status = 404;
        response.data = {
          error: databaseCreateFailed.error,
          message: databaseCreateFailed.message,
        };
      } else {
        response.data = groupData;
      }
      return response;
    } else {
      response.status = 403;
      response.data = {
        error: accessDenied,
        message: accessDenied,
      };
      return response;
    }
  } catch (error) {
    throw error;
  }
};

const deleteGroup = async (req) => {
  const response = { status: 200, data: {} };
  try {
    if (isGroupAdmin(req, parseInt(req.params.id)) ) {
      const groupInstance = await Group.findByPk(req.params.id);
      if (groupInstance) {
        const groupData = await Group.destroy({
          where: {
            id: req.params.id,
          },
          individualHooks: true,
        });
        if (!groupData) {
          response.status = 404;
          response.data = {
            error: resourceNotFound.error,
            message: resourceNotFound.message,
          };
        } else {
          response.data = { message: updateSuccess };
        }
        return response;
      } else {
        response.status = 404;
        response.data = {
          error: resourceNotFound.error,
          message: resourceNotFound.message,
        };
        return response;
      }
    } else {
      response.status = 403;
      response.data = {
        error: accessDenied,
        message: accessDenied,
      };
      return response;
    }
  } catch (error) {
    throw error;
  }
};

const getAllGroups = async (req) => {
  const response = { status: 200, data: {} };
  try {
    const whereCondition = groupWhereCondition(req, "read");
    const groupData = await Group.findAll({ where: whereCondition, raw: true });
    if (!groupData) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
      return response;
    } else {
      response.data = groupData;
      return response;
    }
  } catch (error) {
    throw error;
  }
};

const getGroupById = async (req) => {
  const response = { status: 200, data: {} };
  try {
    const whereCondition = groupWhereCondition(req, "read");
    const groupData = await Group.findOne({
      where: {
        [Op.and]: [
          {
            id: req.params.id,
          },
          whereCondition,
        ],
      }
    });
    if (!groupData) {
      response.status = 404;
      response.data = {
        error: resourceNotFound.error,
        message: resourceNotFound.message,
      };
      return response;
    } else {
      response.data = groupData;
      return response;
    }
  } catch (error) {
    throw error;
  }
};

const updateGroup = async (req) => {
  const response = { status: 200, data: {} };
  console.dir(req.memberAccess);
  try {
    if (!isGroupAdmin(req, parseInt(req.params.id))) {
      response.status = 403;
      response.data = {
        error: accessDenied,
        message: accessDenied,
      };
      return response;
    } else {
      const [updatedRowsCount] = await Group.update(req.body, {
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

      return response;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  addGroup,
  deleteGroup,
  getAllGroups,
  getGroupById,
  updateGroup,
};
