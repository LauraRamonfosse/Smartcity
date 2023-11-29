const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const reviewController = require("../controleur/reviewDB");

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/:id', reviewController.getReview);
router.get('/', reviewController.getAllReview);

router.post('/', upload.fields([
    {name:"date", maxCount :1},
    {name:"rating", maxCount :1},
    {name:"title", maxCount :1},
    {name:"content", maxCount :1},
    {name:"likes_counter", maxCount :1},
    {name:"dislikes_counter", maxCount :1},
    {name:"user_id", maxCount :1},
    {name:"book_id", maxCount :1}
]) , reviewController.postReview);

router.patch('/:id', upload.fields([
    {name: "id", maxCount:1},
    {name:"date", maxCount :1},
    {name:"rating", maxCount :1},
    {name:"title", maxCount :1},
    {name:"content", maxCount :1},
    {name:"likes_counter", maxCount :1},
    {name:"dislikes_counter", maxCount :1},
    {name:"user_id", maxCount :1},
    {name:"book_id", maxCount :1}
]) , reviewController.updateReview);

router.delete('/:id', reviewController.deleteReview);

module.exports = router;