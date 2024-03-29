const router = require("express").Router();
const { Member, Group } = require("../../../db/models");
const {
  addMember,
  deleteMember,
  getAllMembers,
  getMemberById,
  updateMemberById,
} = require("../../../controllers/memberController");

const { setMemberAccess } = require("../../../utils/memberABAC");

const {
  badRequest,
  resourceNotFound,
  serverError,
  updateSuccess,
} = require("../../../utils/strings");

// api/v1/members
router.get("/", setMemberAccess, async (req, res) => {
  try {
    const members = await getAllMembers(req);
    res.status(members.status).json(members.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

router.get("/:id", setMemberAccess, async (req, res) => {
  try {
    const { id } = req.params;
    const member = await getMemberById(req);
    res.status(member.status).json(member.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

router.delete("/:id", setMemberAccess, async (req, res) => {
  try {
    const member = await deleteMember(req);
    res.status(member.status).json(member.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

// setMemberAccess is intentionallly left out so a member can 'sign up' without being logged in or
// belonging to a group. Member status is set to 'pending' by default
router.post("/", async (req, res) => {
  try {
    const member = await addMember(req);
    res.status(member.status).json(member.data);
  } catch (err) {
    res.status(err.status || 400).json(err);
  }
});

router.put("/:id", setMemberAccess, async (req, res) => {
  try {
    const member = await updateMemberById(req);
    res.status(member.status).json(member.data);
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || serverError });
  }
});

module.exports = router;
