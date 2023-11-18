const UserRouter = require('./user');
const router = require("express").Router();

router.use("/users", UserRouter);

module.exports = router;

