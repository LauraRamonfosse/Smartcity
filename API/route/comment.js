const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const CommentController = require('../controleur/commentDB');

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/:id', CommentController.getComment);
router.get('/all/:id', CommentController.getAllCommentsFromReviewId);

router.post('/', upload.fields([
    {name:"content", maxCount :1},
    {name:"authorId", maxCount :1},
    {name:"reviewId", maxCount :1}
]) , CommentController.postComment);
router.patch('/:id', upload.fields([
    {name:"content", maxCount :1},
    {name:"authorId", maxCount :1},
    {name:"reviewId", maxCount :1}
]), CommentController.updateComment);

router.delete('/:id',   CommentController.deleteComment);

module.exports = router;