module.exports.getReview = async (client, id) => {
    return await client.query("SELECT * FROM review WHERE id = $1", [id]);
};

module.exports.getAllReview = async (client) => {
    return await client.query(`SELECT r.id, r.date, r.title, r.content, r.rating, r.likes_counter, r.dislikes_counter, r.book_id, r.user_id, a.username, b.isbn
    FROM review r 
    INNER JOIN account a ON r.user_id = a.id 
    INNER JOIN book b ON r.book_id = b.isbn 
    `);
};

module.exports.postReview = async (client, title, content, rating, user_id, book_id) => {
    return await client.query(`
        INSERT INTO review (date, rating, title, content, likes_counter, dislikes_counter, user_id, book_id)
        VALUES(CURRENT_DATE, $3, $1, $2, 0, 0, $4, $5)
        RETURNING id`, [title, content, rating, user_id, book_id]);
};

module.exports.updateReview = async (client, id, title, new_content, rating) => {
    return await client.query(`
        UPDATE review
        SET date = CURRENT_DATE,
            title = $1,
            content = $2,
            rating = $4,
            likes_counter = 0,
            dislikes_counter = 0
        WHERE id = $3
        RETURNING id
        `, [title, new_content, id, rating]);
};

module.exports.deleteReview = async (client, id) => {
    return await client.query("DELETE FROM review WHERE id = $1", [id]);
};
module.exports.getBookRatings = async(isbn, client) =>{
    return await client.query("SELECT rating FROM review WHERE book_id = $1", [isbn]);
};
