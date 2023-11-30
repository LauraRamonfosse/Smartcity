module.exports.mustBeAdmin = (req, res, next) => {
    console.log("req.session: ", req.session);
    console.log("req.session.authLevel: ", req.session.authLevel);
    if(req.session && req.session.authLevel === 'admin'){
        next();
    } else {
        res.sendStatus(403);
    }
}
