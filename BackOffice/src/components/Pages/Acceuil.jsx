import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "../DataTable";
import FormButton from "../FormButton";
import UserForm from "../forms/UserForm";
import BookForm from "../forms/BookForm";
import ReviewForm from "../forms/ReviewForm";
import CommentForm from "../forms/CommentForm";
import { BackOfficeLayout } from "../BackOfficeLayout";
import { useEffect } from "react";
import { useState } from "react";
import { getAllUsers } from "../../API/user";
import { getAllReviews } from "../../API/reviews";
import { getAllBooks } from "../../API/book";
import { getAllActors } from "../../API/actor";
import { getAllRoles } from "../../API/role";
import { getCommentsFromIdReview } from "../../API/comments";
import { fetchBookData, setBooks } from "../../store/bookSlice";
import { fetchUserData, setUsers } from "../../store/userSlice";
import "../../stylesheet/backoffice.css";


function Acceuil() {
    const {name, type, id} = useParams();
    const [content, setContent] = useState(<></>);
    const [tableKey, setTableKey] = useState(0);
    const dispatch = useDispatch();
    const token = useSelector(state => state.auth.token);
        
    


    // const fetchUserData = async () => {
    //     try {
    //         const userDataRows = [];
    //         const users = await getAllUsers(token);
    //         users.forEach(user => {
    //             userDataRows.push([
    //                 {type: 'text', content: user.id},
    //                 {type: 'text', content: user.username},
    //                 {type: 'text', content: user.email_address},
    //                 {type: 'text', content: user.password},
    //                 {type: 'text', content: user.country},
    //                 {type: 'text', content: user.phone_number},
    //                 {type: 'boolean', content: user.news_letter},
    //                 {type: 'modifyButton', content: 'Modify'},
    //                 {type: 'deleteButton', content: 'Delete'}
    //             ]);
    //         });
    //         setContent(
    //             <>
    //                 <DataTable dataRows={userDataRows}/>
    //                 <FormButton type={(type ? type : 'add')} name={name} form={<UserForm type={type}/>}/>
    //             </>
    //         );
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // };
    // const fetchBookData = async() =>{
    //     try {
    //         const bookDataRows = [];
    //         const books = await getAllBooks(token);
    //         books.forEach(book => {
    //             bookDataRows.push([
    //                 {type: 'text', content: book.isbn},
    //                 {type: 'text', content: book.title},
    //                 {type: 'text', content: book.rating},
    //                 {type: 'text', content: book.author},
    //                 {type: 'text', content: book.illustrator? book.illustrator : "none"},
    //                 {type: 'text', content: book.description},
    //                 {type: 'text', content: book.country},
    //                 {type: 'text', content: book.genre},
    //                 {type: 'text', content: book.released_year},
    //                 {type: 'text', content: book.pages},
    //                 {type: 'text', content: book.publishing_house},
    //                 {type: 'text', content: book.img_path},
    //                 {type: 'modifyButton', content: 'Modify'},
    //                 {type: 'deleteButton', content: 'Delete'}
    //             ]);
    //         });
    //         setContent(
    //             <>
    //                 <DataTable key={tableKey} headers={bookHeaders} dataRows={bookDataRows}/>
    //                 <FormButton type={(type ? type : 'add')} name={name} form={<BookForm type={type}/>}/>
    //             </>
    //         );
    //         setTableKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // };
    
    // Fonction pour regrouper les livres par acteur
    // const groupBooksByActor = async () => {
    //     const actors = await getAllActors(token);
    //     const actorMap = new Map();

    //     actors.forEach(actor => {
    //         const { actor_name, book_name } = actor;

    //         if (!actorMap.has(actor_name)) {
    //             actorMap.set(actor_name, { actor_name, books: [] });
    //         }

    //         if (book_name) {
    //             actorMap.get(actor_name).books.push(book_name);
    //         }
    //     });

    //     return Array.from(actorMap.values()).map(actor => ({
    //         actor_name: actor.actor_name,
    //         books: actor.books.join(', ') || "No association to a book"
    //     }));
    // };

    // const fetchActorData = async () => {
    //     try {
    //         const actorDataRows = [];
    //         const actorData = await groupBooksByActor();

    //         actorData.forEach(actor => {
    //             actorDataRows.push([
    //                 { type: 'text', content: actor.actor_name },
    //                 { type: 'text', content: actor.books },
    //             ]);
    //         });

    //         setContent(
    //             <>
    //                 <DataTable key={tableKey} headers={actorHeaders}/>
    //             </>
    //         );

    //         setTableKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // };
    // const fetchRolesData = async() =>{
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
    //         setContent(
    //             <>
    //                 <DataTable key={tableKey} headers={roleHeaders} dataRows={roleDataRows}/>
    //             </>
    //         );
    //         setTableKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // }


    // const fetchReviewData = async () => {
    //     try {
    //         const reviewDataRows = [];
    //         const reviews = await getAllReviews();
    //         reviews.forEach(review => {
    //             reviewDataRows.push([
    //                 {type: 'text', content: review.id},
    //                 {type: 'text', content: review.username},
    //                 {type: 'text', content: review.isbn},
    //                 {type: 'text', content: review.content},
    //                 {type: 'text', content: review.title},
    //                 {type: 'commentsButton', content: 'link'},
    //                 {type: 'text', content: review.likes_counter},
    //                 {type: 'text', content: review.rating},
    //                 {type: 'modifyButton', content: 'Modify'},
    //                 {type: 'deleteButton', content: 'Delete'}
    //             ]);
    //         });
    //         setContent(
    //             <>
    //                 <DataTable key={tableKey} headers={reviewHeaders} dataRows={reviewDataRows}/>
    //                 <FormButton type={type} form={<ReviewForm type={type} />}/>
    //             </>
    //         );
    //         setTableKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }   
    // };


    // const fetchCommentData = async (id) => {
    //     try {
    //         const commentDataRows = [];
    //         const comments = await getCommentsFromIdReview(id);
    //         comments.forEach(comment => {
    //             commentDataRows.push([
    //                 {type: 'text', content: comment.id},
    //                 {type: 'text', content: comment.username},
    //                 {type: 'text', content: comment.content},
    //                 {type: 'text', content: (comment.likes_counter - comment.dislikes_counter)},
    //                 {type: 'modifyButton', content: 'Modify'},
    //                 {type: 'deleteButton', content: 'Delete'}
    //             ]);
    //         });
    //         setContent(
    //             <>
    //                 <DataTable key={tableKey} headers={commentHeaders} dataRows={commentDataRows}/>
    //                 <FormButton type={type} form={<CommentForm type={type} />}/>
    //             </>
    //         );
    //         setTableKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }   
    // };

    // const fetchTopRatedBooks = async () => {
    //     try {
    //         const bookDataRows = [];
    //         let books = await getAllBooks(token);
    
    //         // Trier les livres par ordre décroissant de rating
    //         books.sort((a, b) => b.rating - a.rating);
    
    //         // Prendre les 10 meilleurs livres
    //         const top10Books = books.slice(0, 10);
    
    //         top10Books.forEach((book) => {
    //             bookDataRows.push([
    //                 { type: 'text', content: book.title },
    //                 { type: 'text', content: book.rating },
    //             ]);
    //         });
    
    //         setContent(
    //             <>
    //                 <DataTable key={tableKey} headers={[bookHeaders[1], bookHeaders[2]]} dataRows={bookDataRows} />
    //             </>
    //         );
    //         setTableKey((prevKey) => prevKey + 1);
    //     } catch (error) {
    //         console.error("Error fetching data: ", error);
    //     }
    // };

    useEffect(() => {
        switch(name){
            case 'users':
                console.log("fetching user data");
                dispatch(fetchUserData(token));
        
            
                break;
            case 'books':
                console.log("fetching book data");
                dispatch(fetchBookData(token));
                break;
            // case 'actors' :
            //     console.log("fetching actor data");
            //     fetchActorData();
            //     break;
            // case 'reviews':
            //     console.log("fetching review data");
            //     fetchReviewData();
            //     break;
            // case 'comments':
            //     console.log("fetching comment data");
            //     fetchCommentData(id);
            //     break;
            // case 'roles':
            //     console.log("fetching role data");
            //     fetchRolesData();
            //     break;
            // case 'best':
            //     console.log("fetching best data");
            //     fetchTopRatedBooks();
            //     break;
            default:
                setContent(<></>);
                break;
        }
    }, [name, type, dispatch, token]);

    const localBook = useSelector((state) => state.books.books);
    return (

        <>
            <BackOfficeLayout content={ <><DataTable dataRows={localBook} /> <FormButton type={type} name={name} form={<BookForm type={type}/>}/> </>}>      
            </BackOfficeLayout>

        </>
      );
    
}

export default Acceuil;
