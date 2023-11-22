const UserRouter = require('./user');
const CommentRouter = require('./comment');
const BookRouter = require('./book');
const RoleRouter = require('./role');
const ReviewRouter = require('./review');
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/comment", CommentRouter);
router.use('/book', BookRouter);
router.use('/role', RoleRouter);
router.use("/review", ReviewRouter);

module.exports = router;

