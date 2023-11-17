module.exports.mustBeManager = (req, res, next) => {
    if(req.session && req.session.authLevel === "manager"){
        next();
    } else {
        res.sendStatus(403);
    }
}
