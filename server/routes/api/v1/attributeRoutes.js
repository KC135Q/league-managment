const router = require("express").Router();
const { Attribute } = require("../../../db/models");

router.get("/", async (req, res) => {
  try {
    const attributes = await Attribute.findAll();
    res.status(200).json(attributes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;