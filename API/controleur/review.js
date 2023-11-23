const pool = require('../modele/database');
const commentModele = require('../modele/comment');
const reviewModele = require('../modele/review');

module.exports.getReview = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: comments} = await reviewModele.getReview(client, id);
            const comment = comments[0];
            if(comment !== undefined){
                res.json(comment);
            } else {
                res.sendStatus(404);
            }
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


module.exports.postReview = async (req, res) => {
    const body = req.body;
    const {title, content, user_id, book_id} = body;
    const client = await pool.connect();
    try{
        const {rows} = await reviewModele.postReview(client, title, content, user_id, book_id);
        res.sendStatus(201).send(rows[0].id);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.updateReview = async (req, res) => {
    const {id, title, newContent} = req.body;
    const client = await pool.connect();
    try{
        await reviewModele.updateReview(client, id, title, newContent);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteReview = async (req, res) => {
    const idTexte = req.params.id;
    const id = parseInt(idTexte);
    const client = await pool.connect();

    try {
        if (isNaN(id)) {
            res.sendStatus(400);
            return;
        }
        await client.query("BEGIN");
        await commentModele.deleteCommentsFromReview(client, id);
        await reviewModele.deleteReview(client, id);
        await client.query("COMMIT");

        res.sendStatus(204);
    } catch (error) {
        await client.query("ROLLBACK");
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};
