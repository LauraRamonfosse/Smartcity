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

const fetchBookData = async(dispatch) => {
  try {
      //const books = await getAllBooks(token);
      const books = [
          {
            isbn: '978-1885-77-41',
            title: '1984',
            author: 'George Orwell',
            date: '1984',
            image: './images/test.jpg',
            rating: 4.5,
            genre: 'dystopique',
            illustrator : 'Georges Rohner',
            publishing_house : 'machin',
            country : 'United Kingdom',
            nbRatings : 40
          },
          {
            isbn: '977-1885-77-414',
            title: 'Animal Farm',
            author: 'George Orwell',
            date: '1945',
            image: './images/test1.jpg',
            rating: 3,
            genre: 'dystopique',
            illustrator : 'Georges Rohner',
            publishing_house : 'machin',
            country : 'United Kingdom',
            nbRatings : 60
          },
          {
            isbn: '976-1885-77-514',
            title: 'Brave New World',
            author: 'Aldous Huxley',
            date: '1932',
            image: './images/test2.jpg',
            rating: 4,
            genre: 'dystopique',
            illustrator : 'Georges Rohner',
            publishing_house : 'machin',
            country : 'United Kingdom',
            nbRatings : 20
          },
        ];
    dispatch(setBooks(books));
      
  } catch (error) {
      console.error("Error fetching data: ", error);
  }
};


export {fetchBookData}