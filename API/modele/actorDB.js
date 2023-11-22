module.exports.getActor = async(name,client) =>{
    return await client.query("SELECT * FROM actor WHERE name = $1", [name]);

}

module.exports.insertActor = async(name,client)=>{
    const {rows} = await client.query("INSERT INTO actor(name) VALUES ($1) RETURNING id", [name]);
    return rows[0].id;
}