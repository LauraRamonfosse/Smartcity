const pool = require('../modele/database');
const actorModele = require('../modele/actorDB');

module.exports.getAllActors = async(req,res) => {
    const client = await pool.connect();
    try{
        const {rows : actors } = await actorModele.getAllActors(client);
        res.json(actors);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    finally{
        client.release();
    }
}