const pool = require('../modele/database');
const bookModele = require('../modele/bookDB');
const roleModele = require('../modele/roleDB');
const actorModele = require('../modele/actorDB');
const reviewModele = require('../modele/reviewDB');
const {bookSchema} = require('../schema/ValidationSchemas.js');
const {saveImage} = require('../modele/imageManager');
const imageSize = require('image-size');
const uuid = require('uuid');
const fs = require('fs');
const destFolderImages = "./upload/images";

module.exports.getBookByID = async (req, res) => {
    if(req.session === undefined){
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
            console.error("error: ", error);
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
                res.status(404).json('Aucun livre existant');
            }
        } 
        catch (error) {
            await client.query('ROLLBACK');
            console.error("error: ", error);
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
    const image = req.files?.image || null;
    let imageName = null;
    // Image facultative donc vérifier si elle existe
    if (image) {
        console.log("OK IMAGE");
        // Vérifier si les dimensions de l'image sont valides en utilisant image-size
        const dimensions = imageSize(image[0].buffer);
        if (!dimensions.width || !dimensions.height) {
            return res.status(400).json("Le fichier n\'est pas une image valide.");
        }
        imageName = uuid.v4();
    }

    try {
        console.log("OK Try");
        // Valider les champs du formulaire
        const newData = bookSchema.parse({
            isbn: toInsert.isbn,
            title: toInsert.title,
            description: toInsert.description,
            country: toInsert.country,
            genre: toInsert.genre,
            releasedYear: toInsert.released_year,
            pages: parseInt(toInsert.pages),
            publishingHouse: toInsert.publishing_house,
            illustrator: toInsert.illustrator === "" ? null : toInsert.illustrator,
            imgPath: imageName,
            author: toInsert.author,
        });
        console.log("OK Vérification champs");
        console.log("New data : ", newData);

        //Transformer l'année en int pour l'insérer dans la BD
        newData.releasedYear = parseInt(newData.releasedYear);

        // Créer un tableau d'acteurs
        const actors = [{ type: "author", name: newData.author }, { type: "illustrator", name: newData.illustrator }];
        const client = await pool.connect();
        try {
            await client.query('BEGIN;');
            // Insérer le livre dans la base de données
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

            // Traiter les acteurs et les rôles
            for (let actor of actors) {
                if (actor.name != null) {
                    // Vérifier si l'acteur existe dans la base de données
                    const { rows: actorRows } = await actorModele.getActor(actor.name, client);
                    // Insérer l'acteur dans la base de données s'il n'existe pas
                    let actorID = actorRows.length > 0 ? actorRows[0].id : await actorModele.insertActor(actor.name, client);
                    // Insérer le rôle dans la base de données
                    await roleModele.insertRole(newData.isbn, actorID, actor.type, client);
                }
            }

            await client.query("COMMIT");
            // Utiliser la fonction saveImage pour enregistrer l'image seulement si tout a fonctionné et qu'une image est fournie
            if (image) {
                try {
                    await saveImage(image[0].buffer, imageName, destFolderImages);
                } catch (error) {
                    res.sendStatus(500).json()
                }
            }
            res.sendStatus(201);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }

    } catch (error) {
        res.sendStatus(400);
        if (error.errors) {
            // Zod validation error contains an array of individual errors
            error.errors.forEach((validationError) => {
              console.error(`Validation Error for ${validationError.path.join('.')} : ${validationError.message}`);
            });
        } else {
            // Handle non-validation errors
            console.error(`Error during validation: ${error.message}`);
        }
        
    }
};





module.exports.updateBook = async (req, res) => {
    const toUpdate = req.body;
    const bookISBN = toUpdate.isbn;
    const image = req.files?.image || null;
    let imageName = null;
    if(bookISBN != undefined){

        // Handle image if provided
        if (image) {
            // Validate image dimensions
            const dimensions = imageSize(image[0].buffer);
            if (!dimensions.width || !dimensions.height) {
                return res.status(400).json("Le fichier n\'est pas une image valide.");
            }
            imageName = uuid.v4();
        }

        try {
            // Validate the request body against the Zod schema
            const updatedData = bookSchema.parse({
                isbn: bookISBN,
                title: toUpdate.title,
                description: toUpdate.description,
                country: toUpdate.country,
                genre: toUpdate.genre,
                releasedYear: toUpdate.released_year,
                pages: parseInt(toUpdate.pages),
                publishingHouse: toUpdate.publishing_house,
                illustrator: toUpdate.illustrator === "" ? null : toUpdate.illustrator,
                imgPath: imageName,
                author: toUpdate.author,
            });

            updatedData.releasedYear = parseInt(updatedData.releasedYear);

            // Create an array of actors
            const actors = [{ type: "author", name: updatedData.author }, { type: "illustrator", name: updatedData.illustrator }];
            const client = await pool.connect();

            try {
                //Supprimer l'image du folder upload
                let fileNameToDelete = null;
                let filePath = null;
                const {rows} = await bookModele.getBookByID(bookISBN, client);
                if(rows[0].img_path){
                    fileNameToDelete = rows[0].img_path
                    filePath = `${destFolderImages}/${fileNameToDelete}.jpeg`;
                    // Vérifier si le fichier existe avant de le supprimer
                    if (fs.existsSync(filePath)) {
                        // Supprimer le fichier
                        fs.unlinkSync(filePath);
                        console.log(`Le fichier ${fileNameToDelete} a été supprimé.`);
                    }
                }
                await client.query('BEGIN;');
                // Update the book in the DB
                await bookModele.updateBook(
                    bookISBN,
                    updatedData.title,
                    updatedData.description,
                    updatedData.country,
                    updatedData.genre,
                    updatedData.releasedYear,
                    updatedData.pages,
                    updatedData.publishingHouse,
                    updatedData.imgPath,
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
                // Save the new image only if the book update is successful and an image is provided
                if (image) {
                    try {
                        await saveImage(image[0].buffer, imageName, destFolderImages);
                    } catch (error) {
                        console.error(error);
                        res.status(500).json("Erreur lors de la mise à jour de l'image");
                    }
                }
                res.sendStatus(204);

            } catch (error) {
                await client.query('ROLLBACK');
                console.error(error);
                res.status(500).json("Erreur lors de la mise à jour du livre");
            } finally {
                client.release();
            }
        } catch (error) {
            // Handle validation errors
            console.error(error.errors);
            res.status(400).json("La validation du formulaire a échoué");
        }
    } else{
        res.sendStatus(400);
    }
};




module.exports.deleteBook = async (req,res) =>{
    const bookISBN = req.params.id;
    if(bookISBN != undefined){
        const client = await pool.connect();
        try{
            //Supprimer l'image du folder upload
            let fileNameToDelete = null;
            let filePath = null;
            const {rows} = await bookModele.getBookByID(bookISBN, client);
            if(rows[0].img_path){
                fileNameToDelete = rows[0].img_path
                filePath = `${destFolderImages}/${fileNameToDelete}.jpeg`;
                // Vérifier si le fichier existe avant de le supprimer
                if (fs.existsSync(filePath)) {
                    // Supprimer le fichier
                    fs.unlinkSync(filePath);
                    console.log(`Le fichier ${fileNameToDelete} a été supprimé.`);
                }
            }
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