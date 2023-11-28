module.exports.getActor = async(name,client) =>{
    return await client.query("SELECT * FROM actor WHERE name = $1", [name]);

};

module.exports.insertActor = async(name,client)=>{
    const {rows} = await client.query("INSERT INTO actor(name) VALUES ($1) RETURNING id", [name]);
    return rows[0].id;
};
module.exports.getAllActors = async (client) => {
    return await client.query(`
        SELECT 
            a.id, 
            a.name AS actor_name,  
            b.title AS book_name
        FROM actor a
        LEFT JOIN role r ON a.id = r.id_actor
        LEFT JOIN book b ON r.id_book = b.isbn
    `);
};
