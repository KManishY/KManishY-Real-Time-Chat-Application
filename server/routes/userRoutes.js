const express = require('express');
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/profile').get(protect, getUserProfile);

module.exports = router;
