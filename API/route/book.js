const BookControlleur = require('../controleur/bookDB');
const UserControlleur = require('../controleur/userDB');
const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");

const Router = require("express-promise-router");
const router = new Router;

router.post('/',UserControlleur.login,JWTMiddleWare.identification,AuthoMiddleware.mustBeAdmin, BookControlleur.insertBook);
router.patch('/',JWTMiddleWare.identification,AuthoMiddleware.mustBeAdmin, BookControlleur.updateBook);
router.delete('/',JWTMiddleWare.identification,AuthoMiddleware.mustBeAdmin, BookControlleur.deleteBook);
router.get('/',JWTMiddleWare.identification, BookControlleur.getBooks);

module.exports = router;