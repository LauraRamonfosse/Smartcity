// import { getAllUsers } from '../API/user';
// import { getAllReviews } from '../API/reviews';
// import { getAllRoles } from '../API/role';
// import { getAllActors } from '../API/actor';
import { setBooks } from './bookSlice';
// import { setBestBooks } from './slice/bestBooksSlice';
// import { setReviews } from './slice/reviewSlice';
// import { setUsers } from './slice/userSlice';
// import { setRoles } from './slice/roleSlice';
// import { setActors } from './slice/actorSlice';
import axios from 'axios';

const getAllBooks = async (token) => {

    const response = await axios.get(bookURL, {
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    });
    return response.data;
};

export const login = async (formData) => {
    // we get a token
    return await axios.post(`${userURL}/login`, formData)
    .then(response => {
        //get a token and save it in local storage
        const token = response.data.token;
        return response.data;
    })
    .catch(error => {
        console.error(error);
        return error;
    });

}
export const fetchBookData = async(dispatch, token) =>{
    try {
        const bookDataRows = [];
        const books = await getAllBooks(token);
        console.log("books database: ", books);
        books.forEach(book => {
            bookDataRows.push([
                {isbn : book.isbn,
                title : book.title,
                rating : book.rating,
                author : book.author,
                illustrator : book.illustrator? book.illustrator : "none",
                description : book.description,
                country : book.country,
                genre : book.genre,
                year : book.released_year,
                pages : book.pages,
                publishingHouse : book.publishing_house,
                image : book.img_path? book.img_path : "none"
                }
            ]);
        });
        console.log(bookDataRows);
        dispatch(setBooks(bookDataRows));
        
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
};

// const fetchTopRatedBooks = async (dispatch, token) => {
//     try {
//         let bestDataRows = [];
//         let books = await getAllBooks(token);

//         // Trier les livres par ordre décroissant de rating
//         books.sort((a, b) => b.rating - a.rating);

//         // Prendre les 10 meilleurs livres
//         const top10Books = books.slice(0, 10);

//         top10Books.forEach((book) => {
//             bestDataRows.push([
//                 {isbn : book.isbn ,
//                  title : book.title ,
//                  type: 'text', content: book.rating 
//                 }
//             ]);
//         });
//         dispatch(setBestBooks(bestDataRows));
//     }
    
//     catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// }

// const fetchUserData = async (dispatch, token) => {
//     try {
//         const userDataRows = [];
//         const users = await getAllUsers(token);
//         users.forEach(user => {
//             userDataRows.push([
//                 {type: 'text', content: user.id},
//                 {type: 'text', content: user.username},
//                 {type: 'text', content: user.email_address},
//                 {type: 'text', content: user.password},
//                 {type: 'text', content: user.role},
//                 {type: 'text', content: user.country},
//                 {type: 'text', content: user.phone_number},
//                 {type: 'boolean', content: user.news_letter},
//                 {type: 'modifyButton', content: 'Modify'},
//                 {type: 'deleteButton', content: 'Delete'}
//             ]);
//         });
//         dispatch(setUsers(userDataRows));
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// };

// const fetchReviewData = async(dispatch, token) =>{
//     try {
//         const reviewDataRows = [];
//         const reviews = await getAllReviews(token);
//         reviews.forEach(review => {
//             reviewDataRows.push([
//                 {type: 'text', content: review.id},
//                 {type: 'text', content: review.date},
//                 {type: 'text', content: review.rating},
//                 {type: 'text', content: review.title},
//                 {type: 'text', content: review.content},
//                 {type: 'text', content: review.likes_counter},
//                 {type: 'text', content: review.dislikes_counter},
//                 {type: 'text', content: review.user_id},
//                 {type: 'text', content: review.book_id},
//                 {type: 'modifyButton', content: 'Modify'},
//                 {type: 'deleteButton', content: 'Delete'}
//             ]);

//         });
//         dispatch(setReviews(reviewDataRows));
        
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// };

// // const fetchCommentData = async(dispatch, token) =>{
// //     try {
// //         const commentDataRows = [];
// //         const comments = await getAllComments(token);
// //         comments.forEach(comment => {
// //             commentDataRows.push([
// //                 {type: 'text', content: comment.id},
// //                 {type: 'text', content: comment.content},
// //                 {type: 'text', content: comment.date},
// //                 {type: 'text', content: comment.likes_counter},
// //                 {type: 'text', content: comment.dislikes_counter},
// //                 {type: 'text', content: comment.review_id},
// //                 {type: 'text', content: comment.user_id},
// //                 {type: 'modifyButton', content: 'Modify'},
// //                 {type: 'deleteButton', content: 'Delete'}
// //             ]);

// //             dispatch(setComments(commentDataRows));
// //         });
        
// //     } catch (error) {
// //         console.error("Error fetching data: ", error);
// //     }
// // };

// const fetchRoleData = async(dispatch, token) =>{
//     try {
//         const roleDataRows = [];
//         const roles = await getAllRoles(token);
//         roles.forEach(role => {
//             roleDataRows.push([
//                 {type: 'text', content: role.id},
//                 {type: 'text', content: role.role_name},
//                 {type: 'text', content: role.actor_name},
//                 {type: 'text', content: role.book_title},
//             ]);
//         });
//         dispatch(setRoles(roleDataRows));
        
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// };

// const groupBooksByActor = async (token) => {
//     const actors = await getAllActors(token);
//     const actorMap = new Map();
//     console.log("GROUP BOOKS BY ACTOR");
//     actors.forEach(actor => {
//         const { id, actor_name, book_name } = actor;

//         if (!actorMap.has(actor_name)) {
//             actorMap.set(actor_name, { id, actor_name, books: [] });
//         }

//         if (book_name) {
//             actorMap.get(actor_name).books.push(book_name);
//         }
//     });

//     return Array.from(actorMap.values()).map(actor => ({
//         id: actor.id,
//         actor_name: actor.actor_name,
//         books: actor.books.join(', ') || "No association to a book"
//     }));
// };

// const fetchActorData = async(dispatch,token) =>{
//     try {
//         const actorDataRows = [];
//         console.log("HERE ARE THE ACTORS");
//         const actorData = await groupBooksByActor(token);

//         actorData.forEach(actor => {
//             actorDataRows.push([
//                 {type: 'text', content : actor.id},
//                 { type: 'text', content: actor.actor_name },
//                 { type: 'text', content: actor.books },
//             ]);
//         });
//         dispatch(setActors(actorDataRows));
        
//     } catch (error) {
//         console.error("Error fetching data: ", error);
//     }
// }


// export const loadDataBase = async (dispatch, token) => {
//     try {
//         await fetchBookData(dispatch, token);
//         await fetchTopRatedBooks(dispatch,token);
//         await fetchUserData(dispatch, token);
//         await fetchReviewData(dispatch, token);
//         // await fetchCommentData(dispatch, token);
//         await fetchRoleData(dispatch, token);
//         await fetchActorData(dispatch, token);
//     }
//     catch (err) {
//         console.error(err);
//     }
// }



