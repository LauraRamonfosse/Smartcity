module.exports.getComment= async (client, id) => {
    return await client.query("SELECT * FROM message WHERE id = $1", [id]);
};

module.exports.getAllCommentFromReviewId = async (client, idReview) =>{
    return await client.query(`
        SELECT *
        FROM message
        WHERE review_id = $1`, [idReview]
    );
}

module.exports.postComment = async (client, content, authorId, reviewId) => {
    return await client.query(`
        INSERT INTO message(content, date, likesCounter, dislikesCounter, review_id, user_id)
        VALUES($1, CURRENT_DATE, 0, 0, $2, $3)
        RETURNING id`, [content, reviewId, authorId]
    );
};



module.exports.updateComment = async (client, id, newContent) => {

    return await client.query(`
        UPDATE message
        SET content = $1,
            date = CURRENT_DATE,
            likesCounter = 0,
            dislikesCounter = 0
        WHERE id = $2
        RETURNING id`, [newContent, id]                          
    );
};


module.exports.deleteComment = async (client, id) => {
    return await client.query("DELETE FROM message WHERE id = $1", [id]);
};

module.exports.deleteCommentsFromReview = async (client, reviewId) => {
    return await client.query("DELETE FROM message WHERE review_id = $1", [reviewId]);
};
