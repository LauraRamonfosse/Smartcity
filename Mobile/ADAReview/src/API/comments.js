import axios from "axios";
const commentURL = "http://localhost:3001/comments";

const sendForm = async (formData) => {  
    return await axios.post(commentURL, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log("response: ", response);
      })
      .catch(error => {
        console.error(error);
      });
    

};

const getComment = async () => {    
    const response = await axios.get(commentURL);
    return response.data;
};

const getCommentsFromIdReview = async (id) => {    
    const response = await axios.get(`${commentURL}/all/${id}`);
    console.log("response get: ", response);
    return response.data;
};

const deleteComment = async (id) => {    
    try {
      const response = await axios.delete(`${commentURL}/${id}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
};

const updateComment = async (id, formData) => {    
    return await axios.patch(`${commentURL}/${id}`, formData, {
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

export {sendForm, getComment, getCommentsFromIdReview, deleteComment, updateComment};