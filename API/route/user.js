const AuthoMiddleware = require("../middleware/Authorization");
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const UserControleur = require('../controleur/userDB');

const Router = require("express-promise-router");
const router = new Router;
const multer = require("multer");
const upload = multer();

router.get('/', JWTMiddleWare.identification, UserControleur.getAllUsers);
router.get('/:id', JWTMiddleWare.identification, UserControleur.getUserById);

router.post('/', upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'email_address', maxCount: 1},
    {name: 'password', maxCount: 1},
    {name: 'role', maxCount: 1, default: 'user'},
    {name: 'country', maxCount: 1},
    {name: 'phone_number', maxCount: 1},
    {name: 'news_letter', maxCount: 1}
]), JWTMiddleWare.identification, UserControleur.createUser);

router.post('/login',upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'password', maxCount: 1}
]), UserControleur.login);

router.patch('/', upload.fields([
    {name: 'id', maxCount: 1},
    {name: 'username', maxCount: 1},
    {name: 'email_address', maxCount: 1},
    {name: 'password', maxCount: 1},
    {name: 'role', maxCount: 1, default: 'user'},
    {name: 'country', maxCount: 1},
    {name: 'phone_number', maxCount: 1},
    {name: 'news_letter', maxCount: 1}
]), JWTMiddleWare.identification, UserControleur.updateUser);
router.delete('/:id', upload.fields([
    {name: 'username', maxCount: 1},
    {name: 'password', maxCount: 1}
]), JWTMiddleWare.identification, UserControleur.deleteUser);

module.exports = router;
