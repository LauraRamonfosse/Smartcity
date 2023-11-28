require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const hash = require('../utils/utils');

const pool = require('../modele/database');
const UserModele = require('../modele/userDB');

module.exports.login = async (req, res) => {
    

    const {username, password} = req.body;
    console.log("username API: ", username);
    console.log("password API: ", password);

    if(username === undefined || password === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = (await UserModele.login(client, username));
            const user = result.rows[0];
            console.log("user: ", user);
            console.log("hash.compareHash(password, user.password): ", await hash.compareHash(password, user.password));

            if(user !== undefined && await hash.compareHash(password, user.password)){
                const {id, role} = user;
                if (role !== "admin" && role !== "user") {
                    console.log("role not admin or user");
                    res.sendStatus(404);
                } else {
                    console.log("role admin or user");
                    const payload = {status: role, value: {id}};
                    const token = jwt.sign(
                        payload,
                        process.env.SECRET_TOKEN,
                        {expiresIn: '1d'}
                    );
                    req.session = {id, role};
                    res.json({token});
                }
            }
            else{
                res.status(404).json({message: 'User not found'});
            }
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.updateUser = async (req, res) => {
    if(req.session){
        const client = await pool.connect();
        const toUpdate = req.body;
        const newData = {};
        const userObj = req.session;
        const {rows: users} = await UserModele.getUserById(client, toUpdate.id);
        const user = users[0];
        let doUpdate = false;
        newData.id = toUpdate.id;
        // if the user is a simple user and the id is not his id, he can't update another user
        if(userObj.id !== toUpdate.id && userObj.authLevel !== "admin"){
            res.sendStatus(401);
        }
        // if the user is a simple user, he can't update the role
        if(userObj.authLevel !== "admin"){
            toUpdate.role = user.role;
        }
        

        if(
            toUpdate.username !== undefined ||
            toUpdate.email_address !== undefined ||
            toUpdate.password !== undefined ||
            toUpdate.role !== undefined ||
            toUpdate.country !== undefined ||
            toUpdate.phone_number !== undefined ||
            toUpdate.news_letter !== undefined
        ){
            doUpdate = true;
        }

        if(doUpdate){
            newData.username = toUpdate.username;
            newData.email_address = toUpdate.email_address;
            newData.password = toUpdate.password;
            newData.role = toUpdate.role;
            newData.country = toUpdate.country;
            newData.phone_number = toUpdate.phone_number;
            newData.news_letter = toUpdate.news_letter;
        }

        try{
            await UserModele.updateUser(
                client,
                newData.id,
                newData.username,
                newData.email_address,
                newData.password,
                newData.role,
                newData.country,
                newData.phone_number,
                newData.news_letter
            );
            res.sendStatus(204);
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

module.exports.getUserById = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: users} = await UserModele.getUserById(client, id);
            if(users.length > 0){
                const user = users[0];
                res.json(user);
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

// userId, username, password, emailAdress, country, phoneNumber, newsLetter

module.exports.getUser = async (req, res) => {
    if(req.session){
        const userObj = req.session;
        const client = await pool.connect();
        try{
            const {rows: users} = await UserModele.getUser(client, userObj.id);
            const user = users[0];
            if(user !== undefined){
                res.json(user);
            } else {
                res.sendStatus(404);
            }
        }
        catch (e) {
            console.error(e);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    } else {
        res.sendStatus(401);
    }
}

// username, password, emailAdress, role, country, phoneNumber, newsLetter

module.exports.createUser = async (req, res) => {
    const client = await pool.connect();
    const newData = req.body;
    const userObj = req.session;
    if (!newData.username
        || !newData.password
        || !newData.email_address
        || !newData.role
        || !newData.country
        || !newData.phone_number
        || !newData.news_letter
        ) {
        res.sendStatus(400);
        return;
    }
    if (userObj.role !== "admin") {
        newData.role = "user";
    }
    try{
        await UserModele.createUser(
            client,
            newData.username,
            newData.password,
            newData.email_address,
            newData.role,
            newData.country,
            newData.phone_number,
            newData.news_letter,
            newData.profile_picture_path
        );
        res.sendStatus(201);
    }
    catch (e) {
        console.error(e);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}


// delete user
module.exports.deleteUser = async (req, res) => {
    if(req.session){
        const client = await pool.connect();
        const idText = req.params.id;
        const id = parseInt(idText);
        console.log("id: ", id);
        const userObj = req.session;
        console.log("userObj: ", userObj);
    
        // if the user is a simple user, he can't delete another user
        if(userObj.id !== id && userObj.authLevel !== "admin"){
            console.log("not admin and not allowed");
            res.sendStatus(401);
        }
    
        try{
            if(isNaN(id)){
                console.log("id is NaN");
                res.sendStatus(400);
            } else {
                console.log("id is not NaN");
                await UserModele.deleteUser(client, id);
                res.sendStatus(204);
            }
        } catch (error){
            console.log("error: ", error);
            console.error(error);
            res.sendStatus(500);
        } finally {
            client.release();
        }
    }
}

module.exports.getAllUsers = async (req, res) => {
    const client = await pool.connect();
    try{
        const {rows: users} = await UserModele.getAllUsers(client);
        if(users.length > 0){
            // display all users
            res.json(users);
        } else {
            res.sendStatus(404);
        }    }
    catch (e) {
        console.error('Error in getAllUsers:', e.message);
        res.sendStatus(500);
    } finally {
        client.release();
    }
}

