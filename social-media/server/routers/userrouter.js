const router = require("express").Router();
const usercontroller = require('../controllers/usercontroller');
const requireUser = require('../middlewares/requireUser');



router.post('/follow', requireUser, usercontroller.followorunfollowusercontroller);
router.get('/getFeedData', requireUser, usercontroller.getFeedData);
router.get('/getmyposts', requireUser, usercontroller.getmyposts);

router.get('/getuserposts', requireUser, usercontroller.getuserposts);

router.delete('/', requireUser, usercontroller.deleteMyProfile);

router.get('/getMyinfo', requireUser, usercontroller.getMyinfo);

router.put('/', requireUser, usercontroller.updateUserProfile);

router.post('/getuserprofile', requireUser, usercontroller.getUserProfile);
module.exports = router;