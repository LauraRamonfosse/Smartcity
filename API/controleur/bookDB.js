const pool = require('../modele/database');
const bookModele = require('../modele/bookDB');
const roleModele = require('../modele/roleDB');
const actorModele = require('../modele/actorDB');

module.exports.getBooks = async (req, res) => {
    if(req.session !== undefined){
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
    
            const { rows: books } = await bookModele.getBooks(client);
    
            if (books.length > 0) {
                for (const book of books) {
                    const { rows: roles } = await roleModele.getRolesByBookID(book.isbn, client);
    
                    for (const role of roles) {
                        if(role.role_name === "author"){
                            book.author = role.actor_name;
                        }
                        if(role.role_name === "illustrator"){
                            book.illustrator = role.actor_name;
                        }
                    }
                    
                }
    
                await client.query('COMMIT');
                res.json(books);
            } 
            else {
                await client.query('ROLLBACK');
                res.status(404).json({ error: 'Aucun livre existant' });
            }
        } 
        catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            res.sendStatus(500);
        } 
        finally {
            client.release();
        }
    }
    else{
        res.sendStatus(401);
    }
}

module.exports.insertBook = async (req,res) =>{
    const toInsert = req.body;
    const newData = {};
    let actors = [];
    const mandatoryFields = ['isbn', 'title', 'description', 'country', 'genre', 'released_year', 'pages', 'publishing_house', 'author'];

    const doInsert = mandatoryFields.every(field => toInsert[field] !== undefined);

    if(doInsert){
        newData.isbn = toInsert.isbn;
        newData.title = toInsert.title;
        newData.description = toInsert.description;
        newData.country = toInsert.country;
        newData.genre = toInsert.genre;
        newData.releasedYear = parseInt(toInsert.released_year);
        newData.pages = parseInt(toInsert.pages);
        newData.publishingHouse = toInsert.publishing_house;
        newData.illustrator = toInsert.illustrator === undefined ? null:toInsert.illustrator;
        newData.imgPath = toInsert.img_path === undefined ? null:toInsert.img_path;
        newData.author = toInsert.author;
        actors = [{type : "author" , name : newData.author}, {type : "illustrator", name : newData.illustrator}];
        const client = await pool.connect();

        try{
            await client.query('BEGIN;');
            //Insérer le livre dans la BD
            await bookModele.insertBook(newData.isbn, newData.title, newData.description, newData.country, newData.genre, 
            newData.releasedYear, newData.pages, newData.publishingHouse, newData.imgPath, client);

            for(let actor of actors){
                if(actor != null){
                //Verifier si l'acteur existe dans la BD
                const {rows : actorRows} = await actorModele.getActor(actor.name, client);
                //Insérer l'acteur dans la BD s'il n'existe pas
                let actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);
                //Insérer le role dans la BD
                await roleModele.insertRole(newData.isbn, actorID, actor.type, client);
                }
            }
            await client.query("COMMIT");
            res.status(201).json({ message: "Livre inséré avec succès" });

        }
        catch(error){
            await client.query('ROLLBACK');
            console.log(error);
            res.sendStatus(500);
        }
        finally{
            client.release();
        }
    }
    else{
        res.sendStatus(400).json({error : "Certains champs obligatoires ne sont pas remplis"});
    }

}

module.exports.updateBook = async (req,res) =>{
    const toUpdate = req.body
    const bookISBN = toUpdate.isbn;
    const newData = {};
    let actors = [];
    const mandatoryFields = ['isbn', 'title', 'description', 'country', 'genre', 'released_year', 'pages', 'publishing_house', 'author'];

    const doUpdate = mandatoryFields.every(field => toUpdate[field] !== undefined);

    if(doUpdate){
        newData.title = toUpdate.title;
        newData.description = toUpdate.description;
        newData.country = toUpdate.country;
        newData.genre = toUpdate.genre;
        newData.releasedYear = parseInt(toUpdate.released_year);
        newData.pages = parseInt(toUpdate.pages);
        newData.publishingHouse = toUpdate.publishing_house;
        newData.illustrator = toUpdate.illustrator === undefined ? null:toUpdate.illustrator;
        newData.imgPath = toUpdate.img_path === undefined ? null:toUpdate.img_path;
        newData.author = toUpdate.author;
        actors = [{type : "author" , name : newData.author}, {type : "illustrator", name : newData.illustrator}];

        const client = await pool.connect();
        try{
            await client.query('BEGIN;');
            //Update le livre dans la BD
            await bookModele.updateBook(bookISBN, newData.title, newData.description, newData.country, newData.genre, newData.releasedYear, newData.pages, newData.publishingHouse, newData.imgPath, client);
            //Supprimez les roles liés au livre dans la BD
            await roleModele.deleteRole(bookISBN,client);
            // Réaffecter les roles en fonction des nouvelles données
            for(let actor of actors){
                if(actor != null){
                //Verifier si l'acteur existe dans la BD
                const {rows : actorRows} = await actorModele.getActor(actor.name, client);
                //Insérer l'acteur dans la BD s'il n'existe pas + récupérer l'ID
                const actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);
                //Insérer le role dans la BD
                await roleModele.insertRole(bookISBN, actorID, actor.type, client);
                }
            }
            await client.query("COMMIT");
            res.status(204);

        }
        catch(error){
            await client.query('ROLLBACK');
            console.log(error);
            res.status(500).json({ error: "Erreur lors de la mise à jour du livre", details: error.message});
        }
    }
    else{
        res.sendStatus(400).json({error : "Certains champs obligatoires ne sont pas remplis"});
    }

}

module.exports.deleteBook = async (req,res) =>{
    const bookISBN = req.body.isbn;
    const client = await pool.connect();
    try{
        await client.query("BEGIN;");
        //Supprimer les roles liés au livre
        await roleModele.deleteRole(bookISBN,client);
        //Supprimer le livre
        await bookModele.deleteBook(bookISBN, client);
        await client.query("COMMIT");
        res.sendStatus(204);
    }
    catch(error){
        await client.query("ROLLBACK");
        console.log(error);
        res.sendStatus(500);
    }
    finally{
        client.release();
    }
}