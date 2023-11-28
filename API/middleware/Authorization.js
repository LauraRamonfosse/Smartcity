module.exports.mustBeAdmin = (req, res, next) => {
    if(req.session && req.session.role === "admin"){
        next();
    } else {
        res.sendStatus(403);
    }
}
