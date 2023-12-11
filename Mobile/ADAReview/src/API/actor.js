import axios from "axios";
const actorURL = "http://localhost:3001/actors";


const getAllActors = async (token) => {

    const response = await axios.get(actorURL, {
        headers: {
            'Authorization' : 'Bearer ' + token
        }
    });
    return response.data;
};
export {getAllActors}