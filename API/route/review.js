const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const reviewController = require("../controleur/review");

const Router = require("express-promise-router");
const router = new Router;

router.get('/:id', reviewController.getReview);
router.post('/',  reviewController.postReview);
router.patch('/',  reviewController.updateReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;