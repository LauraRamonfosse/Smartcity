require("dotenv").config();
const process = require('process');
const jwt = require('jsonwebtoken');
const hash = require('../utils/utils');

const pool = require('../modele/database');
const UserModele = require('../modele/userDB');


// write the code that will be used when a user login
module.exports.login = async (req, res) => {
    
    const secretKey = 'constantinople';

    const {username, password} = req.body;
    if(username === undefined || password === undefined){
        res.sendStatus(400);
    } else {
        const client = await pool.connect();
        try {
            const result = (await UserModele.login(client, username));
            const user = result.rows[0];
            // console.log('User:', user); // Debug log
            // console.log('Username:', username); // Debug log
            // console.log('Hashed password', await hash.getHash(password)); // Debug log
            // console.log('User Hashed Password', user.password);
            if(user !== undefined && await hash.compareHash(password, user.password)){
                const {id, role} = user;
                if (role !== "admin" && role !== "user") {
                    res.sendStatus(404);
                } else {
                    const payload = {status: role, value: id};
                    // console.log('Payload:', payload); // Debug log
                    const token = jwt.sign(
                        payload,
                        secretKey,
                        {expiresIn: '1d'}
                    );
                    res.json(token);
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

module.exports.getUserById = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            const {rows: users} = await UserModele.getUserById(client, id);
            const user = users[0];
            if(user !== undefined){
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
    if (!newData.username) {
        res.status(400).json(newData.username);
        return;
    }
    try{
        await UserModele.createUser(
            client,
            newData.username,
            newData.emailAdress,
            newData.password,
            newData.role,
            newData.country,
            newData.phoneNumber,
            newData.newsLetter,
            newData.profilePicturePath
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


module.exports.updateUser = async (req, res) => {
    if(req.session){
        const toUpdate = req.body;
        const newData = {};

        // newData.username = toUpdate.username ? toUpdate.username : userObj.username;
        // newData.emailAdress = toUpdate.emailAdress ? toUpdate.emailAdress : userObj.emailAdress;
        // newData.password = toUpdate.password ? toUpdate.password : userObj.password;
        // newData.country = toUpdate.country ? toUpdate.country : userObj.country;
        // newData.phoneNumber = toUpdate.phoneNumber ? toUpdate.phoneNumber : userObj.phoneNumber;
        // newData.newsLetter = toUpdate.newsLetter ? toUpdate.newsLetter : userObj.newsLetter;

        const client = await pool.connect();
        try{
            await UserModele.updateUser(
                client,
                toUpdate.id,
                toUpdate.username,
                toUpdate.emailAdress,
                toUpdate.password,
                toUpdate.country,
                toUpdate.phoneNumber,
                toUpdate.newsLetter
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

// delete user
module.exports.deleteUser = async (req, res) => {
    const client = await pool.connect();
    const idText = req.params.id;
    const id = parseInt(idText);
    try{
        if(isNaN(id)){
            res.sendStatus(400);
        } else {
            await UserModele.deleteUser(client, id);
            res.sendStatus(204);
        }
    } catch (error){
        console.error(error);
        res.sendStatus(500);
    } finally {
        client.release();
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

