const router = require("express").Router();
const { setMemberAccess } = require("../../../utils/memberABAC");
const { serverError } = require("../../../utils/strings");
const { addMembership, getAllMemberships, getGroupMembers } = require("../../../controllers/membershipController");

// api/v1/membership route

// Get all memberships
router.get("/", setMemberAccess, async (req, res) => {
  try {
    const memberships = await getAllMemberships(req);
    res.status(memberships.status).json(memberships.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

// Get a member of a group
router.get("/group/:group_id", setMemberAccess, async (req, res) => {
  try {
    const groupMember = await getGroupMembers(req);
    res.status(groupMember.status).json(groupMember.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

router.post("/", setMemberAccess, async (req, res) => {
  try {
    const response = await addMembership(req);
    res.status(response.status).json(response.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

module.exports = router;
