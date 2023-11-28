import axios from "axios";
const rolesURL = "http://localhost:3001/roles";


const getAllRoles = async (token) => {
    //return an array of users
    const response = await axios.get(rolesURL, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });
    return response.data;
};

export {getAllRoles}