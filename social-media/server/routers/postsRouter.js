const router = require("express").Router();
const postsController = require("../controllers/postsController");
const requireUser = require("../middlewares/requireUser");

router.post("/", requireUser, postsController.createPostController);
router.post("/like", requireUser, postsController.likeandunlinkepost);
router.put('/', requireUser, postsController.updatepost);
router.delete('/', requireUser, postsController.deletepost);
module.exports = router;