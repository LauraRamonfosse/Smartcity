module.exports.getRoles = async(client) =>{
    return await client.query(`SELECT r.id_book, r.id_actor, r.title AS role_name, a.name AS actor_name, b.title AS book_title
                               FROM role r 
                               INNER JOIN actor a ON (r.id_actor = a.id)
                               INNER JOIN book b ON (r.id_book = b.isbn)`);
                            }

module.exports.getRolesByBookID = async(id_book,client) =>{
    return await client.query(`SELECT r.id_book, r.id_actor, r.title AS role_name, a.name AS actor_name, b.title AS book_title
                              FROM role r 
                              INNER JOIN actor a ON (r.id_actor = a.id)
                              INNER JOIN book b ON (r.id_book = b.isbn)
                              WHERE r.id_book = $1`,
                              [id_book]);
};

module.exports.insertRole = async(id_book, id_actor,title, client) =>{
    return await client.query("INSERT INTO role (id_book, id_actor, title) VALUES ($1,$2,$3)", [id_book,id_actor,title]);
}

module.exports.deleteRole = async(id_book,client) =>{
    return await client.query("DELETE FROM role WHERE id_book = $1", [id_book]);
}