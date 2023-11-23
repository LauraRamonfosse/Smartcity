const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const UserControleur = require('../controleur/userDB');

const Router = require("express-promise-router");
const router = new Router;

router.get('/', UserControleur.getAllUsers);
router.get('/:id', UserControleur.getUserById);

router.post('/', upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'password', maxCount: 1},
    {name: 'email_address', maxCount: 1},
    {name: 'country', maxCount: 1},
    {name: 'phone_number', maxCount: 1},
    {name: 'news_letter', maxCount: 1}
]), UserControleur.createUser);

router.post('/login', UserControleur.login);
router.patch('/', JWTMiddleWare.identification, UserControleur.updateUser);
router.delete('/:id', JWTMiddleWare.identification, AuthoMiddleware.mustBeAdmin, UserControleur.deleteUser);

module.exports = router;
