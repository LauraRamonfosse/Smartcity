const pool = require('../modele/database');
const roleModele = require('../modele/roleDB');
module.exports.getRoles = async (req,res) =>{
    const client = await pool.connect();
    try{
        const roles =[];
        const {rows} = await roleModele.getRoles(client);
        for(let row of rows){
            console.log("Row from the database:", row);
            const role = {};
            role.role_name = row.role_name;
            role.actor_name = row.actor_name;
            role.book_title = row.book_title;
            roles.push(role);
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