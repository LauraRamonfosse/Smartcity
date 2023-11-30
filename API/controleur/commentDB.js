const pool = require('../modele/database');
const commentModele = require('../modele/commentDB');


module.exports.getComment = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: comments} = await commentModele.getComment(client, id);
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

module.exports.getAllCommentsFromReviewId  = async (req, res) => {
    const client = await pool.connect();
    const idTexte = req.params.id; // attention ! Il s'agit de texte !
    const id = parseInt(idTexte);

    try {
        if (isNaN(id)) {
            res.sendStatus(400);
        } else {
            const { rows: comments } = await commentModele.getAllCommentsFromReviewId(client, id);

            if (comments.length > 0) {
                // Si des commentaires sont trouvés, renvoyer tous les commentaires
                res.json(comments);
            } else {
                // Si aucun commentaire n'est trouvé, renvoyer un statut 404
                res.sendStatus(404);
            }
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
};



module.exports.postComment = async (req, res) => {
    // const body = req.body;
    const {content, review_id, user_id} = req.body;
    const client = await pool.connect();
    try{
        console.log("req.body", req.body);
        const {rows} = await commentModele.postComment(client, content, user_id, review_id);
        console.log("rows", rows);
        const commentId = rows[0].id;
        console.log("commentId", commentId);
        const message = 'Le commentaire a été ajouté avec succès.';
        res.status(201).json({message, commentId});
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.updateComment = async (req, res) => {
    const {id, newContent} = req.body;
    const client = await pool.connect();
    try{
        await commentModele.updateComment(client, id, newContent);
        res.sendStatus(204);
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

module.exports.deleteComment = async (req, res) => {
    const idTexte = req.params.id; //attention ! Il s'agit de texte !
    const id = parseInt(idTexte);
    const client = await pool.connect();
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            await commentModele.deleteComment(client, id);
            const message = 'Le commentaire a été supprimé avec succès.';

            // Envoyer une réponse avec un code d'état 204 (No Content) et le message
            res.status(204).send(message);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}