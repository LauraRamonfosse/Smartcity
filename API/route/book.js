const BookControlleur = require('../controleur/bookDB');
const UserControlleur = require('../controleur/userDB');
const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/', BookControlleur.getBooks);
router.get('/:id', BookControlleur.getBookByID);
router.post('/',JWTMiddleWare.identification, upload.fields([
    {name: 'isbn', maxCount: 1},
    {name: 'title', maxCount: 1},
    {name: 'author', maxCount: 1},
    {name: 'released_year', maxCount: 1},
    {name: 'genre', maxCount: 1},
    {name: 'country', maxCount: 1},
    {name: 'pages', maxCount: 1},
    {name: 'description', maxCount: 1},
    {name: 'illustrator', maxCount: 1},
    {name: 'publishing_house', maxCount: 1},
    {name : 'img_path', maxCount : 1}
]), BookControlleur.createBook);

router.patch('/',JWTMiddleWare.identification, BookControlleur.updateBook);
router.delete('/:id',JWTMiddleWare.identification, BookControlleur.deleteBook);

module.exports = router;