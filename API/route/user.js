const UserControleur = require('../controleur/userDB');

const Router = require("express-promise-router");
const router = new Router;

router.get('/', UserControleur.getAllUsers);
router.get('/:id', UserControleur.getUserById);
router.post('/', UserControleur.createUser);
router.post('/login', UserControleur.login);
router.patch('/', UserControleur.updateUser);
router.delete('/:id', UserControleur.deleteUser);

module.exports = router;




