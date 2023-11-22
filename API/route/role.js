const RoleControlleur = require('../controleur/roleDB');

const Router = require("express-promise-router");
const router = new Router;

router.get('/', RoleControlleur.getRoles);

module.exports = router;