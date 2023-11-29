const pool = require('../modele/database.js');
const bookModele = require('../modele/bookDB');
const roleModele = require('../modele/roleDB');
const actorModele = require('../modele/actorDB');
const reviewModele = require('../modele/reviewDB');
const bookSchema = require('../schema/ValidationSchemas.js');

module.exports.getBookByID = async (req, res) => {
    if(req.session !== undefined){
        const bookISBN = req.params.id;
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
    
            const {rows} = await bookModele.getBookByID(bookISBN, client);
            if (rows.length > 0) {
                const book = rows[0];
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
    if(req.session !== undefined){
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


module.exports.createBook = async (req, res) => {
    const toInsert = req.body;

    try {
        // Validate the request body against the Zod schema
        const newData = bookSchema.parse({
            isbn: toInsert.isbn,
            title: toInsert.title,
            description: toInsert.description,
            country: toInsert.country,
            genre: toInsert.genre,
            releasedYear: toInsert.released_year,
            pages: parseInt(toInsert.pages),
            publishingHouse: toInsert.publishing_house,
            illustrator: toInsert.illustrator === undefined ? null : toInsert.illustrator,
            imgPath: toInsert.img_path === undefined ? null : toInsert.img_path,
            author: toInsert.author,
        });

        // Perform additional data transformations if needed
        newData.releasedYear = parseInt(newData.releasedYear);

        // Create an array of actors
        const actors = [{ type: "author", name: newData.author }, { type: "illustrator", name: newData.illustrator }];
        const client = await pool.connect();

        try {
            await client.query('BEGIN;');
            // Insert the book into the DB
            await bookModele.insertBook(
                newData.isbn,
                newData.title,
                newData.description,
                newData.country,
                newData.genre,
                newData.releasedYear,
                newData.pages,
                newData.publishingHouse,
                newData.imgPath,
                client
            );            

            // Process actors and roles
            for (let actor of actors) {
                if (actor.name != null) {
                    // Check if the actor exists in the DB
                    const { rows: actorRows } = await actorModele.getActor(actor.name, client);
                    // Insert the actor into the DB if not exists
                    let actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);
                    // Insert the role into the DB
                    await roleModele.insertRole(newData.isbn, actorID, actor.type, client);
                }
            }

            await client.query("COMMIT");
            res.sendStatus(201);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }

    } catch (error) {
        console.error(error.errors);
        res.status(400).json({ error: "Form validation failed", details: error.errors });
    }
};



module.exports.updateBook = async (req, res) => {
    const toUpdate = req.body;
    const bookISBN = toUpdate.isbn;

    try {
        // Validate the request body against the Zod schema
        const updatedData = bookSchema.parse({
            isbn: bookISBN,
            title: toUpdate.title,
            description: toUpdate.description,
            country: toUpdate.country,
            genre: toUpdate.genre,
            released_year: toUpdate.released_year,
            pages: parseInt(toUpdate.pages),
            publishing_house: toUpdate.publishing_house,
            illustrator: toUpdate.illustrator === undefined ? null : toUpdate.illustrator,
            img_path: toUpdate.img_path === undefined ? null : toUpdate.img_path,
            author: toUpdate.author,
        });

        // Perform additional data transformations if needed
        updatedData.released_year = parseInt(updatedData.released_year);

        // Create an array of actors
        const actors = [{ type: "author", name: updatedData.author }, { type: "illustrator", name: updatedData.illustrator }];
        const client = await pool.connect();

        try {
            await client.query('BEGIN;');
            // Update the book in the DB
            await bookModele.updateBook(
                bookISBN,
                updatedData.title,
                updatedData.description,
                updatedData.country,
                updatedData.genre,
                updatedData.released_year,
                updatedData.pages,
                updatedData.publishing_house,
                updatedData.img_path,
                client
            );

            // Delete roles linked to the book in the DB
            await roleModele.deleteRole(bookISBN, client);

            // Reassign roles based on the new data
            for (let actor of actors) {
                if (actor.name != null) {
                    // Check if the actor exists in the DB
                    const { rows: actorRows } = await actorModele.getActor(actor.name, client);

                    // Insert the actor into the DB if not exists + get the ID
                    const actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);

                    // Insert the role into the DB
                    await roleModele.insertRole(bookISBN, actorID, actor.type, client);
                }
            }

            await client.query("COMMIT");
            res.sendStatus(204);

        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            res.status(500).json({ error: "Erreur lors de la mise à jour du livre", details: error.message });
        } finally {
            client.release();
        }
    } catch (error) {
        // Handle validation errors
        console.error(error.errors);
        res.status(400).json({ error: "La validation du formulaire a échoué", details: error.errors });
    }
};



module.exports.deleteBook = async (req,res) =>{
    const bookISBN = req.params.id;
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