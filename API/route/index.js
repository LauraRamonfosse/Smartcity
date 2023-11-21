const UserRouter = require('./user');
const CommentRouter = require('./comment');
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/comment", CommentRouter);

module.exports = router;

