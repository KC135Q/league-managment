const router = require("express").Router();

const apiRoutes = require("./api");
const authRoutes = require("./auth");

router.use("/api", apiRoutes); 
router.use("/auth", authRoutes);
router.use('/*', (_req, res) => {
    res.status(404).json({ message: 'Route not found' })
})

module.exports = router;
