const router = require('express').Router();
const { registerUser, authUser, allUsers } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

//Chaining method, we can chain more methods in it
router.route('/').post(registerUser).get(protect, allUsers);

//normal, we can,t chain here
router.post('/login', authUser);

// userRoutes & authUser is controller, which is nothing but a js function.

module.exports = router;

