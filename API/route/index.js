const UserRouter = require('./user');
const CommentRouter = require('./comment');
const BookRouter = require('./book');
const RoleRouter = require('./role');
const ActorRouter = require('./actor');
const ReviewRouter = require('./review');
const router = require("express").Router();

router.use("/users", UserRouter);
router.use("/comments", CommentRouter);
router.use('/books', BookRouter);
router.use('/roles', RoleRouter);
router.use('/actors', ActorRouter);
router.use("/reviews", ReviewRouter);

module.exports = router;

