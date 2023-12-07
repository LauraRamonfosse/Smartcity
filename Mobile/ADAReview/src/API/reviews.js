import axios from "axios";
const reviewURL = "http://localhost:3001/reviews";

const sendForm = async (formData) => {

    return await axios.post(reviewURL, formData, {
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


const getAllReviews = async () => {
    //return an array of review
    const response = await axios.get(reviewURL);
    return response.data;
};

const getReviewById = async (id) => {
    //return a review
    const response = await axios.get(`${reviewURL}/${id}`);
    return response.data;
}


const deleteReview = async (id) => {
    //return a review
    try {
      const response = await axios.delete(`${reviewURL}/${id}`);
      return response.data;
  } catch (err) {
      console.error(err);
  }
}

const updateReview = async (id, formData) => {
    //return a review
    return await axios.patch(`${reviewURL}/${id}`, formData, {
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

export {sendForm, getAllReviews, getReviewById, deleteReview, updateReview};