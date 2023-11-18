const { getHash } = require("../utils/utils.js");


module.exports.getUserById = async (client, id) => {
    return await client.query("SELECT * FROM account WHERE id = $1", [id]);
  };

module.exports.createUser = async (client, password, emailAdress, role, country, phoneNumber, newsLetter, profilePicturePath) => {
    return await client.query(
        `INSERT INTO account (username, password, email_adress, role, country, phone_number, news_letter, profile_picture_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [username, await getHash(password), emailAdress, role, country, phoneNumber, newsLetter, profilePicturePath]
    );
}

// client,
// userObj.id,
// newData.username,
// newData.emailAdress,
// newData.password,
// newData.country,
// newData.phoneNumber,
// newData.newsLetter

module.exports.updateUser = async (client, id, username, emailAdress, password, country, phoneNumber, newsLetter) => {

    const params = [];
    const querySet = [];
    let query = "UPDATE account SET ";
    if(username !== undefined){
        params.push(username);
        querySet.push(` username = $${params.length} `);
    }
    if(emailAdress !== undefined){
        params.push(emailAdress);
        querySet.push(` email_adress = $${params.length} `);
    }
    if(password !== undefined){
        params.push(await getHash(password));
        querySet.push(` password = $${params.length} `);
    }
    if(country !== undefined){
        params.push(country);
        querySet.push(` country = $${params.length} `);
    }
    if(phoneNumber !== undefined){
        params.push(phoneNumber);
        querySet.push(` phone_number = $${params.length} `);
    }
    if(newsLetter !== undefined){
        params.push(newsLetter);
        querySet.push(` news_letter = $${params.length} `);
    }
    if(params.length > 0){
        query += querySet.join(',');
        params.push(id);
        query += ` WHERE id = $${params.length}`;
        return client.query(query, params);
    } else {
        throw new Error("No field to update");
    }
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
