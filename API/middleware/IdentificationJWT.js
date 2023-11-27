require('dotenv').config();
const process = require('process');
const jwt = require('jsonwebtoken');

module.exports.identification = async (req, res, next) => {
    const headerAuth = req.get('authorization');
    console.log("headerAuth: ", headerAuth);
    if(headerAuth !== undefined && headerAuth.includes("Bearer")){
        const jwtToken =  headerAuth.split(' ')[1];
        try{
            const decodedJwtToken = jwt.verify(jwtToken, process.env.SECRET_TOKEN);
            console.log("decodedJwtToken: ", decodedJwtToken);
            req.session = decodedJwtToken.value;
            next();
        }
        catch (e) {
            console.error(e);
            res.sendStatus(400);
        }
    } else {
        res.sendStatus(401);
    }
};