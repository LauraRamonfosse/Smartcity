import { getAllUsers } from '../API/user';
import { getAllBooks } from '../API/book';
import { getAllReviews } from '../API/reviews';
import { getAllRoles } from '../API/role';
import { getAllActors } from '../API/actor';
import { setBooks } from './slice/bookSlice';
import { setReviews } from './slice/reviewSlice';
import { setUsers } from './slice/userSlice';
import { setRoles } from './slice/roleSlice';
import { setActors } from './slice/actorSlice';


const fetchBookData = async(dispatch, token) =>{
    try {
        const bookDataRows = [];
        const books = await getAllBooks(token);
        console.log("books database: ", books);
        books.forEach(book => {
            bookDataRows.push([
                {type: 'text', content: book.isbn},
                {type: 'text', content: book.title},
                {type: 'text', content: book.description},
                {type: 'text', content: book.country},
                {type: 'text', content: book.genre},
                {type: 'text', content: book.released_year},
                {type: 'text', content: book.pages},
                {type: 'text', content: book.publishing_house},
                {type: 'text', content: book.img_path},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        console.log(bookDataRows);
        dispatch(setBooks(bookDataRows));
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const fetchUserData = async (dispatch, token) => {
    try {
        const userDataRows = [];
        const users = await getAllUsers(token);
        users.forEach(user => {
            userDataRows.push([
                {type: 'text', content: user.id},
                {type: 'text', content: user.username},
                {type: 'text', content: user.email_address},
                {type: 'text', content: user.password},
                {type: 'text', content: user.role},
                {type: 'text', content: user.country},
                {type: 'text', content: user.phone_number},
                {type: 'boolean', content: user.news_letter},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);
        });
        dispatch(setUsers(userDataRows));
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const fetchReviewData = async(dispatch, token) =>{
    try {
        const reviewDataRows = [];
        const reviews = await getAllReviews(token);
        reviews.forEach(review => {
            reviewDataRows.push([
                {type: 'text', content: review.id},
                {type: 'text', content: review.date},
                {type: 'text', content: review.rating},
                {type: 'text', content: review.title},
                {type: 'text', content: review.content},
                {type: 'text', content: review.likes_counter},
                {type: 'text', content: review.dislikes_counter},
                {type: 'text', content: review.user_id},
                {type: 'text', content: review.book_id},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);

        });
        dispatch(setReviews(reviewDataRows));
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// const fetchCommentData = async(dispatch, token) =>{
//     try {
//         const commentDataRows = [];
//         const comments = await getAllComments(token);
//         comments.forEach(comment => {
//             commentDataRows.push([
//                 {type: 'text', content: comment.id},
//                 {type: 'text', content: comment.content},
//                 {type: 'text', content: comment.date},
//                 {type: 'text', content: comment.likes_counter},
//                 {type: 'text', content: comment.dislikes_counter},
//                 {type: 'text', content: comment.review_id},
//                 {type: 'text', content: comment.user_id},
//                 {type: 'modifyButton', content: 'Modify'},
//                 {type: 'deleteButton', content: 'Delete'}
//             ]);

//             dispatch(setComments(commentDataRows));
//         });
        
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// };

const fetchRoleData = async(dispatch, token) =>{
    try {
        const roleDataRows = [];
        const roles = await getAllRoles(token);
        roles.forEach(role => {
            roleDataRows.push([
                {type: 'text', content: role.id_book},
                {type: 'text', content: role.id_actor},
                {type: 'text', content: role.title},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);

        });
        dispatch(setRoles(roleDataRows));
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

const fetchActorData = async(dispatch, token) =>{
    try {
        const actorDataRows = [];
        const actors = await getAllActors(token);
        actors.forEach(actor => {
            actorDataRows.push([
                {type: 'text', content: actor.id},
                {type: 'text', content: actor.name},
                {type: 'modifyButton', content: 'Modify'},
                {type: 'deleteButton', content: 'Delete'}
            ]);

        });
        dispatch(setActors(actorDataRows));
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}


export const loadDataBase = async (dispatch, token) => {
    try {
        await fetchBookData(dispatch, token);
        await fetchUserData(dispatch, token);
        await fetchReviewData(dispatch, token);
        // await fetchCommentData(dispatch, token);
        await fetchRoleData(dispatch, token);
        await fetchActorData(dispatch, token);
    }
    catch (err) {
        console.error(err);
    }
}



