const pool = require('../modele/database');
const roleModele = require('../modele/roleDB');
module.exports.getRoles = async (req,res) =>{
    const client = await pool.connect();
    let id = 0;
    try{
        const {rows : roles} = await roleModele.getRoles(client);
        for(let role of roles){
            //creer un id personnalisé plutot car l'ID est une combinaison de clés primaires d'autres tables
            role.id = id;
            id++;
        }
        res.json(roles);
    }
    catch(error){
        console.log(error);
        res.sendStatus(500);
    }
    finally{
        client.release();
    }
}