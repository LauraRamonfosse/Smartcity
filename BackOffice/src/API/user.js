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
    const response = await axios.get(`${userURL}/${id}`);
    console.log("${userURL}/${id}", `${userURL}/${id}`);
    console.log("response: ", response);
    return response.data;
}


const deleteUser = async (id, token) => {
    //delete a user
    return await axios.delete(`${userURL}/${id}`
    , {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    })
}

const updateUser = async (formData, token) => {
    //return a user
    return await axios.patch(userURL, formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
}

const login = async (formData) => {
    // we get a token
    console.log("formData: ", formData);
    return await axios.post(`${userURL}/login`, formData)
    .then(response => {
        //get a token and save it in local storage
        const token = response.data.token;
        console.log("token api bo: ", token);
        return response.data;
    })
    .catch(error => {
        console.error(error);
        return error;
    });

}

export {sendForm, getAllUsers, getUserById, deleteUser, updateUser, login};
