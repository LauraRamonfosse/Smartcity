const pool = require('../modele/database');
const bookModele = require('../modele/bookDB');
const roleModele = require('../modele/roleDB');
const actorModele = require('../modele/actorDB');
const reviewModele = require('../modele/review');

module.exports.getBookByID = async (req, res) => {
    if(req.session === undefined){
        const bookISBN = req.params.id;
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
    
            const {rows} = await bookModele.getBookByID(bookISBN, client);
            if (rows.length > 0) {
                const book = rows[0];
                console.log("BOOK : ", book);
                nbRatings = 0;
                sumRatings = 0;
                book.rating = 0;
                // Calcul de la note du livre sur base des notes des review
                const {rows : reviews} = await reviewModele.getBookRatings(book.isbn, client);
                if(reviews.length > 0){

                    for(let review of reviews){
                        nbRatings += 1;
                        sumRatings += review.rating;
                    }
                    book.rating = Math.round((sumRatings / nbRatings) * 10) / 10;
                }

                const { rows: roles } = await roleModele.getRolesByBookID(book.isbn, client);
                for (let role of roles) {
                    if(role.role_name === "author"){
                        book.author = role.actor_name;
                    }
                    if(role.role_name === "illustrator"){
                        book.illustrator = role.actor_name;
                    }
                }

                await client.query('COMMIT');
                res.json(book);
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

module.exports.getBooks = async (req, res) => {
    if(req.session === undefined){
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
    
            const { rows: books } = await bookModele.getBooks(client);
            if (books.length > 0) {
                for (const book of books) {
                    nbRatings = 0;
                    sumRatings = 0;
                    book.rating = 0;
                    // Calcul de la note du livre sur base des notes des review
                    const {rows : reviews} = await reviewModele.getBookRatings(book.isbn, client);
                    if(reviews.length > 0){

                        for(review of reviews){
                            nbRatings += 1;
                            sumRatings += review.rating;
                        }
                        book.rating = Math.round((sumRatings / nbRatings) * 10) / 10;
                    }

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


module.exports.createBook = async (req,res) =>{
    const toInsert = req.body;
    const newData = {};
    let actors = [];
    const mandatoryFields = ['isbn', 'title', 'description', 'country', 'genre', 'released_year', 'pages', 'publishing_house', 'author'];
    let doInsert = true;
    for (const field of mandatoryFields) {
        if (!toInsert.hasOwnProperty(field) || toInsert[field] === undefined) {
            doInsert = false;
            break;  // Si un champ manque ou a une valeur non définie, sortez de la boucle
        }
    }

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
                if(actor.name != null){
                    //Verifier si l'acteur existe dans la BD
                    const {rows : actorRows} = await actorModele.getActor(actor.name, client);
                    //Insérer l'acteur dans la BD s'il n'existe pas
                    let actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);
                    //Insérer le role dans la BD
                    await roleModele.insertRole(newData.isbn, actorID, actor.type, client);
                }
            }
            await client.query("COMMIT");
            res.sendStatus(201);

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
    console.log("Welcome to update");
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
                if(actor.name != null){
                    //Verifier si l'acteur existe dans la BD
                    const {rows : actorRows} = await actorModele.getActor(actor.name, client);
                    //Insérer l'acteur dans la BD s'il n'existe pas + récupérer l'ID
                    const actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);
                    //Insérer le role dans la BD
                    await roleModele.insertRole(bookISBN, actorID, actor.type, client);
                }
            }
            await client.query("COMMIT");
            res.sendStatus(204);
            console.log("fini");

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
    const bookISBN = req.params.id;
    console.log("BOOKISBN : ", bookISBN);
    if(bookISBN != undefined){
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
    else{
        res.sendStatus(400);
    }
}