const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const CommentController = require('../controleur/comment');

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', CommentController.getComment);
router.get('/all/:id', CommentController.getAllCommentFromReviewId);
router.post('/',  CommentController.postComment);
router.patch('/',  CommentController.updateComment);
router.delete('/:id',   CommentController.deleteComment);

module.exports = router;