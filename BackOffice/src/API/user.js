import axios from "axios";
const userURL = "http://localhost:3001/users";

const getAllUsers = async () => {
    //return an array of users
    const response = await axios.get(userURL);
    return response.data;
};

const getUser = async (id) => {
    //return a user
    const response = await axios.get(`${userURL}/${id}`);
    return response.data;
};

const deleteUser = async (id) => {
    //return a user
    const {response, err} = await axios.delete(`${userURL}/${id}`);
    if(err){
        console.error(err);
    }
    return response;
}

export {getAllUsers, getUser, deleteUser};