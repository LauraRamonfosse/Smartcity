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

const getUserById = async (id) => {
    //return a user
    const {response, err} = await axios.get(`${userURL}/${id}`);
    if(err){
        console.error(err);
    }
    console.log("response: ", response);
    return response;
}


const deleteUser = async (id) => {
    //return a user
    const {response, err} = await axios.delete(`${userURL}/${id}`);
    if(err){
        console.error(err);
    }
    return response;
}

const updateUser = async (formData) => {
    //return a user
    return await axios.patch(userURL, formData, {
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
}

export {sendForm, getAllUsers, getUserById, deleteUser, updateUser};
