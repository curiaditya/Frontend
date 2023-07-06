const router = require('express').Router();
const authController = require('../controllers/authcontroller');

router.post('/signup', authController.signupController);
router.post('/login', authController.loginController);
router.get("/refresh", authController.refreshtokenaccesstokencontroller);
router.post("/logout", authController.logoutcontroller);

module.exports = router;