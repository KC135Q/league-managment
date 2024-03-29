const router = require('express').Router();
const { Group } = require('../../../db/models');
const {
  setMemberAccess
} = require('../../../utils/memberABAC');
const { addGroup, deleteGroup, getAllGroups, getGroupById, updateGroup } = require('../../../controllers/groupController'); 
const { serverError } = require('../../../utils/strings');

router.get('/', setMemberAccess, async (req, res) => {
  try {
    const group = await getAllGroups(req);
    res.status(group.status).json(group.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

router.get('/:id', setMemberAccess, async (req, res) => {
  try {
    const group = await getGroupById(req);
    res.status(group.status).json(group.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

router.post('/', setMemberAccess, async (req, res) => {
  try {
    const group = await addGroup(req);
    res.status(group.status).json(group.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

router.put('/:id', setMemberAccess, async (req, res) => {
  try {
    const group = await updateGroup(req);
    res.status(200).json(group.data || { message: serverError });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

/**
 * NOTE: If you are using Group.destroy({ where: ... }) to delete records without first fetching
 *  and destroying individual instances, the hooks won't be triggered. This is addressed below
 *  by fetching the instance first and then destroying it.
 */
router.delete('/:id', setMemberAccess, async (req, res) => {
  try {
    const group = await deleteGroup(req);
    res.status(group.status).json(group.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

module.exports = router;
