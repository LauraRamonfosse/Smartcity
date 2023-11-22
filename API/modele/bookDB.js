module.exports.getBooks = async (client) => {
    return await client.query("SELECT * FROM book");
};

module.exports.getBook = async (title, client) => {
    return await client.query("SELECT * FROM book WHERE title = $1", [title]);
};

module.exports.insertBook = async (ISBN,title, description, country, genre, releasedYear,nbrOfPages,publishingHouse,bookPicturePath, client) =>{
    return await client.query("INSERT INTO book VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING isbn", 
            [ISBN,title,description,country,genre,releasedYear,nbrOfPages,publishingHouse,bookPicturePath]
            );
};

module.exports.updateBook = async (ISBN ,title, description, country, genre, releasedYear,nbrOfPages,publishingHouse,bookPicturePath, client) =>{
        return await client.query(
            `UPDATE book SET title = $2,description = $3, country = $4, genre = $5, 
             released_year = $6, pages = $7, publishing_house = $8, img_path = $9 WHERE isbn = $1`,
            [ISBN ,title, description, country, genre, releasedYear,nbrOfPages,publishingHouse,bookPicturePath]
            );
};

module.exports.deleteBook = async (ISBN, client) =>{
    return await client.query("DELETE FROM book WHERE isbn = $1", [ISBN]);
};