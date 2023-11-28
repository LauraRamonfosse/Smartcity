const { getHash } = require("../utils/utils.js");


module.exports.getUserById = async (client, id) => {
    return await client.query("SELECT * FROM account WHERE id = $1", [id]);
  };

module.exports.createUser = async (client, username, password, email_address, role, country, phone_number, news_letter, profile_picture_path) => {
    return await client.query(
        `INSERT INTO account (username, password, email_address, role, country, phone_number, news_letter, profile_picture_path) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [username, await getHash(password), email_address, role, country, phone_number, news_letter, profile_picture_path]
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

module.exports.updateUser = async (client, id, username, emailAddress, password, role, country, phoneNumber, newsLetter) => {

    const params = [];
    const querySet = [];
    let query = "UPDATE account SET ";
    if(username !== undefined){
        params.push(username);
        querySet.push(` username = $${params.length} `);
    }
    if(emailAddress !== undefined){
        params.push(emailAddress);
        querySet.push(` email_address = $${params.length} `);
    }
    if(password !== undefined){
        params.push(await getHash(password));
        querySet.push(` password = $${params.length} `);
    }
    if(role !== undefined){
        params.push(role);
        querySet.push(` role = $${params.length} `);
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
    await client.query('BEGIN');
    //delete all the user's comments
    await client.query(`DELETE FROM comment WHERE user_id = $1`, [id]);
    // delete all the comments linked to the reviews of the user
    await client.query(`DELETE FROM comment WHERE review_id IN (SELECT id FROM review WHERE user_id = $1)`, [id]);

    //delete reviews
    await client.query(`DELETE FROM review WHERE user_id = $1`, [id]);
    //delete user
    await client.query(`DELETE FROM account WHERE id = $1`, [id]);
    await client.query('COMMIT');
    return;

}

module.exports.getAllUsers = async (client) => {
    return await client.query(`SELECT * FROM account`);
}

module.exports.login = async (client, username) => 
{
    return await client.query(`SELECT * FROM account WHERE username = $1`, [username]);
}
