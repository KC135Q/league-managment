const router = require('express').Router();
const attributeRoutes = require('./attributeRoutes');
const groupRoutes = require('./groupRoutes');
const memberRoutes = require('./memberRoutes');
const membershipRoutes = require('./membershipRoutes');


router.use('/member', memberRoutes);
router.use('/group', groupRoutes);
router.use('/membership', membershipRoutes);

router.use('/attribute', attributeRoutes);

module.exports = router;
