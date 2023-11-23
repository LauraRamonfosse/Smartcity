module.exports.getReview = async (client, id) => {
    return await client.query("SELECT * FROM review WHERE id = $1", [id]);
};

module.exports.postReview = async (client, title, content, user_id, book_id) => {
    return await client.query(`
        INSERT INTO review (date, rating, title, content, likesCounter, dislikesCounter, user_id, book_id)
        VALUES(CURRENT_DATE, 0, $1, $2, 0, 0, $3, $4)
        RETURNING id`, [title, content, user_id, book_id]);
};

module.exports.updateReview = async (client, id, title, newContent) => {
    return await client.query(`
        UPDATE review
        SET date = CURRENT_DATE,
            title = $1,
            content = $2,
            rating = 0,
            likesCounter = 0,
            dislikesCounter = 0
        WHERE id = $3
        RETURNING id
        `, [title, newContent, id]);
};

module.exports.deleteReview = async (client, id) => {
    return await client.query("DELETE FROM review WHERE id = $1", [id]);
};
