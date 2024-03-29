const router = require("express").Router();
const { Group, Member } = require("../../db/models");
const { generateToken } = require("../../utils/auth");
const { authenticationFailed, logout, signup, serverError } = require("../../utils/strings");

router.post("/signup", (req, res) => {
  res.status(200).json({ message: signup });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const member = await Member.findOne({
      where: {
        email: email,
      },
      include: Group,
      raw: true,
    });

    // Member not found, authentication failed
    if (!member) {
      return res.status(404).json({ message: authenticationFailed });
    }

    const passwordMatch = (member.password === password);

    if (passwordMatch) {
      // Passwords match, member is authenticated
      const token = generateToken({memberId: member.id, memberEmail: member.email, memberName: member.memberName });
      return res.status(200).json({ token: token });
    } else {
      // Passwords don't match, authentication failed
      return res.status(404).json({ message: authenticationFailed});
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: serverError });
  }
});

router.post("/logout", (req, res) => {
  res.status(200).json({ message: logout });
});

module.exports = router;
