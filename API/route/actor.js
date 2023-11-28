const ActorControlleur = require('../controleur/actorDB');
const JWTMiddleWare = require("../middleware/IdentificationJWT");
const Router = require("express-promise-router");
const router = new Router;

router.get('/', JWTMiddleWare.identification,ActorControlleur.getAllActors);

module.exports = router;