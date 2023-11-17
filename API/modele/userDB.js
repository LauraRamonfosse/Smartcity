const { getHash } = require("../utils/utils.js");


module.exports.getUserById = async (client, id) => {
    return await client.query("SELECT * FROM account WHERE id = $1", [id]);
  };

module.exports.createUser = async (client, password, emailAdress, role, country, phoneNumber, newsLetter, profilePicturePath) => {
    return await client.query(
        `INSERT INTO account (username, password, emailAdress, role, country, phoneNumber, newsLetter, profilePicturePath) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [username, await getHash(password), emailAdress, role, country, phoneNumber, newsLetter, profilePicturePath]
    );
}

module.exports.updateUser = async (client, id, username, emailAdress, password, country, phoneNumber, newsLetter) => {
    return await client.query(
        `UPDATE account SET username = $2, password = $3, emailAdress = $4, country = $5, phoneNumber = $6, newsLetter = $7 WHERE id = $1`,
        [id, username, await getHash(password), emailAdress, country, phoneNumber, newsLetter]
    );
}



module.exports.deleteUser = async (client, id) => {
    return await client.query(`DELETE FROM account WHERE id = $1`,[id]);
}

module.exports.getAllUsers = async (client) => {
    return await client.query(`SELECT * FROM account`);
}

module.exports.login = async (client, username) => {
    return await client.query(`SELECT * FROM account WHERE username = $1`, [username]);
}
