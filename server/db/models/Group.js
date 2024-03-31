const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/database');

class Group extends Model {
  // Define a method for retrieving all children groups recursively
  async getAllChildrenGroupIds() {
    const getChildIds = async (groupId) => {
      const childGroups = await Group.findAll({
        where: {
          parentGroupId: groupId,
        },
        attributes: ['id'], // Select only the 'id' attribute
      });

      const childIds = childGroups.map((group) => group.id);

      for (const childId of childIds) {
        const grandchildIds = await getChildIds(childId);
        childIds.push(...grandchildIds);
      }

      return childIds;
    };

    const childIds = await getChildIds(this.id);
    return childIds;
  }
}

Group.init(
  {
    groupName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    parentGroupId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    childGroupIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER), // Assuming an array of child group IDs
      allowNull: true,
    },
    policies: {
      type: DataTypes.ARRAY(DataTypes.STRING), // Assuming an array of policy names
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    updatedAt: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'group',
    schema: 'public',
  }
);

const addChildGroup = async (parentGroupId, childGroupId) => {
  const parentGroup = await Group.findByPk(parentGroupId);

  if (!parentGroup) {
    return; 
  }

  console.log("DAK: 67 ~ parentGroupId, parentGroup.childGroupIds ", parentGroupId, parentGroup.childGroupIds);
  let childGroupIds = parentGroup.childGroupIds || [];
  if (childGroupIds.includes(childGroupId)) {
    return;
  } else {
    childGroupIds = [...childGroupIds, childGroupId];
  }

  console.log("DAK: 75 ~ childGroupIds, childGroupId: ", childGroupIds, childGroupId);
  const newParentGroup = await parentGroup.update({
    childGroupIds,
  });
  console.log("DAK: 78 ~ newParentGroup: ", newParentGroup);
};

const removeGroup = async (removedGroupInstance = null) => {
  /** 
   * Deleting a group so parentId and childIds
   * - Go to parentId and remove the group from the childIds array
   * - Go to all the children and remove the group from the parentId -- replace it with null for now.
   */
  console.log("DAK: 89 ~ removedGroupInstance: ", removedGroupInstance);
  return;
} 

const updateChildGroups = async (parentGroupid, childGroupId, deletedId = null) => {
  /**
   * Add a group with a parentGroupId
   * Update a group's parentGroupId (?)
   * Delete a group
   */
  const parentGroup = await Group.findByPk(parentGroupid);
  if (!parentGroup) {
    return;
  }

  const childGroups = await Group.findAll({
    where: {
      parentGroupId: groupId,
    },
  });

  const childGroupIds = childGroups.map((child) => {
    if (child.id === deletedId) {
      return null;
    }
    return child.id;
  });

  await parentGroup.update({
    childGroupIds,
  });

  // Recursively update the parent's parent
  await updateChildGroups(parentGroup.parentGroupId);
};

Group.addHook('afterDestroy', async (instance, _options) => {
  console.log("DAK: 125");
 await removeGroup(instance);
});

Group.addHook('afterCreate', async (instance, _options) => {
  // Update the childGroupIds field for the parent group
  console.log("DAK: 120 ~ instance: ", instance);
  if (!instance.parentGroupId) {
    return;
  }
  await addChildGroup(instance.parentGroupId, instance.id);
});

module.exports = Group;
