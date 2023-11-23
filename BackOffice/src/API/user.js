import axios from "axios";
const userURL = "http://localhost:3001/users";

const sendForm = async (formData) => {

    console.log(formData);
    return await axios.post(userURL, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    

};


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

export {sendForm, getAllUsers, getUser, deleteUser};
