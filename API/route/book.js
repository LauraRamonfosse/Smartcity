const BookControlleur = require('../controleur/bookDB');
const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000, // 700Ko
        files : 1
    },
    storage: storage
});

router.get('/', JWTMiddleWare.identification, BookControlleur.getBooks);
router.get('/:id', JWTMiddleWare.identification, BookControlleur.getBookByID);
router.post('/', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, upload.fields([
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
    {name : 'image', maxCount : 1}
]), BookControlleur.createBook);

router.patch('/',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,upload.fields([
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
    {name : 'image', maxCount : 1}
]),BookControlleur.updateBook);

router.delete('/:id',JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin,BookControlleur.deleteBook);

module.exports = router;