import { useParams } from "react-router-dom";
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
import "../../stylesheet/backoffice.css";


function Acceuil() {
    const {name, type} = useParams();
    const bookContent = <>
    <h3>Summary</h3>
    <p>
        Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian social science fiction novel by English novelist George Orwell.
    </p>
    <h3>Illustrator</h3>
    <p>AAAAAAA j'ai mal au doigt </p>
</>;

    /* USERS */
    const user = {
        username: 'Gougougak',
        country: 'United Kingdom',
        email: 'Gougouga@aa.a',
        phone: '123456789',
        role: 'admin',
        newsletter: true
      }


    const userHeaders = ['ID', 'USERNAME', 'EMAIL', 'PASSWORD', 'COUNTRY', 'PHONE NUMBER', 'NEWSLETTER', 'MODIFY', 'DELETE'] ;
    
    // const userDataRows = [
    //     [
    //         {type: 'text', content: 'CarlosMarcos'},
    //         {type: 'text', content: 'Gougougagak@gougou.gak'},
    //         {type: 'text', content: '********'},
    //         {type: 'text', content: 'france'},
    //         {type: 'text', content: '0123456789'},
    //         {type: 'boolean', content: 'true'},
    //         {type: 'modifyButton', content: 'Modify'},
    //         {type: 'deleteButton', content: 'Delete'}
    //     ],
    //     [
    //         {type: 'text', content: 'Xx_Darksasuke_xX'},
    //         {type: 'text', content: 'darkgougougak@a.AAAA'},
    //         {type: 'text', content: '********'},
    //         {type: 'text', content: 'belgique'},
    //         {type: 'text', content: '012345546'},
    //         {type: 'boolean', content: 'false'},
    //         {type: 'modifyButton', content: 'Modify'},
    //         {type: 'deleteButton', content: 'Delete'}
    //     ]
    // ];

    /* BOOKS */	
    const book = {
        title: '1984',
        author: 'George Orwell',
        editor: 'Secker & Warburg',
        country: 'United Kingdom',
        pages: '328',
        year: '1949',
        isbn: '978-0-452-28423-4',
        summary: 'Nineteen Eighty-Four: A Novel, often published as 1984, is a dystopian social science fiction novel by English novelist George Orwell.',
        illustrator: 'AAAAAAA j\'ai mal au doigt',
        genre: 'Science fiction'

      };

    const bookHeaders = ['TITLE', 'AUTHOR', 'EDITOR', 'COUNTRY', 'INFOS', 'EVAL', 'PAGES', 'YEAR', 'ISBN', 'MODIFY', 'DELETE'];

    const bookDataRows = [
        [
            {type: 'text', content: '1984'},
            {type: 'text', content: 'George Orwell'},
            {type: 'text', content: 'Secker & Warburg'},
            {type: 'text', content: 'United Kingdom'},
            {type: 'infosButton', content: bookContent},
            {type: 'text', content: '4.5'},
            {type: 'text', content: '328'},
            {type: 'text', content: '1949'},
            {type: 'text', content: '978-0-452-28423-4'},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ],
        [
            {type: 'text', content: 'The Lord of the Rings'},
            {type: 'text', content: 'J. R. R. Tolkien'},
            {type: 'text', content: 'George Allen & Unwin'},
            {type: 'text', content: 'United Kingdom'},
            {type: 'infosButton', content: bookContent},
            {type: 'text', content: '4.8'},
            {type: 'text', content: '1216'},
            {type: 'text', content: '29 July 1954'},
            {type: 'text', content: '978-0-618-26030-0'},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ]
    ];

    /* REVIEWS */
    const review = {
        title: 'Gougougak',
        book: 'Gougougak',
        text: 'Gougougak'
      };

    const reviewHeaders = ['AUTHOR', 'BOOK', 'CONTENT', 'TITLE', 'COMMENTS', 'RATING', 'EVAL', 'MODIFY', 'DELETE'];

    const reviewDataRows = [
        [
            {type: 'text', content: 'Xx_Darksasuke_xX'},
            {type: 'text', content: '1984'},
            {type: 'text', content: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
            {type: 'text', content: 'On vit vraiment dans une saucisse'},
            {type: 'commentsButton', content: 'link'},
            {type: 'text', content: '-420'},
            {type: 'text', content: '4.5'},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ],
        [
            {type: 'text', content: 'CarlosMarcos'},
            {type: 'text', content: 'The Lord of the Rings'},
            {type: 'text', content: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
            {type: 'text', content: 'C NUL'},
            {type: 'commentsButton', content: 'link'},
            {type: 'text', content: '-69'},
            {type: 'text', content: '4.8'},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ]
    ];

    /* COMMENTS */
    const comment = {text: "This is a comment"};

    const commentHeaders = ['AUTHOR', 'CONTENT', 'RATING', 'MODIFY', 'DELETE'] ;

    const commentDataRows = [
        [
            {type: 'text', content: 'Xx_Darksasuke_xX'},
            {type: 'text', content: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
            {type: 'text', content: '-420'},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ],
        [
            {type: 'text', content: 'CarlosMarcos'},
            {type: 'text', content: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'},
            {type: 'text', content: '-69'},
            {type: 'modifyButton', content: 'Modify'},
            {type: 'deleteButton', content: 'Delete'}
        ]
    ];

    /* ROLES */
    const role = {
        name: 'Gougougak',
        actor: 'Gougougak',
        book: 'Gougougak'
      };

    const roleHeaders = ['NAME', 'ACTOR', 'BOOK'] ;

    const roleDataRows = [
        [
            {type: 'text', content: 'Author'},
            {type: 'text', content: 'Goerge Orwell'},
            {type: 'text', content: '1984'}
        ],
        [
            {type: 'text', content: 'Author'},
            {type: 'text', content: 'J. R. R. Tolkien'},
            {type: 'text', content: 'The Lord of the Rings'}
        ]
    ];


    /* BEST */
        const bestBook = {
            title: 'Gougougak',
            author: 'Gougougak',
            year: 'Gougougak',
            genre: 'Gougougak',
            country: 'usa',
            pages: 'Gougougak',
            editor: 'Gougougak',
            isbn: 'Gougougak',
            summary: 'Gougougak'    
          };
    
        const bestBookHeaders = ['TITLE', 'AUTHOR', 'EDITOR', 'COUNTRY', 'INFOS', 'EVAL', 'PAGES', 'YEAR', 'ISBN'];
    
        const bestBookDataRows = [
            [
                {type: 'text', content: '1984'},
                {type: 'text', content: 'George Orwell'},
                {type: 'text', content: 'Secker & Warburg'},
                {type: 'text', content: 'United Kingdom'},
                {type: 'infosButton', content: bookContent},
                {type: 'text', content: '4.5'},
                {type: 'text', content: '328'},
                {type: 'text', content: '1949'},
                {type: 'text', content: '978-0-452-28423-4'},
            ],
            [
                {type: 'text', content: 'The Lord of the Rings'},
                {type: 'text', content: 'J. R. R. Tolkien'},
                {type: 'text', content: 'George Allen & Unwin'},
                {type: 'text', content: 'United Kingdom'},
                {type: 'infosButton', content: bookContent},
                {type: 'text', content: '4.8'},
                {type: 'text', content: '1216'},
                {type: 'text', content: '29 July 1954'},
                {type: 'text', content: '978-0-618-26030-0'},
            ]
        ];

    const [content, setContent] = useState(<></>);

    //write a useEffets that change the content of the page depending on the name in the url
    //if name = users, then display the users page
    //if name = books, then display the books page
    //if name = reviews, then display the reviews page
    //if name = comments, then display the comments page
    //if name = roles, then display the roles page
    //if name = actors, then display the actors page
    // get all users but make sure to wait until the function is done
    // before setting the userDataRows
    // userDataRows.push([
    //     {type: 'text', content: user.username},
    //     {type: 'text', content: user.email_address},
    //     {type: 'text', content: user.password},
    //     {type: 'text', content: user.country},
    //     {type: 'text', content: user.phone_number},
    //     {type: 'boolean', content: user.news_letter},
    //     {type: 'modifyButton', content: 'Modify'},
    //     {type: 'deleteButton', content: 'Delete'}
    // ]);
    const fetchUserData = async () => {
        try {
            const userDataRows = [];
            const users = await getAllUsers();
            users.forEach(user => {
                userDataRows.push([
                    {type: 'text', content: user.id},
                    {type: 'text', content: user.username},
                    {type: 'text', content: user.email_address},
                    {type: 'text', content: user.password},
                    {type: 'text', content: user.country},
                    {type: 'text', content: user.phone_number},
                    {type: 'boolean', content: user.news_letter},
                    {type: 'modifyButton', content: 'Modify'},
                    {type: 'deleteButton', content: 'Delete'}
                ]);
            });
            console.log("userDataRows", userDataRows);
            setContent(
                <>
                    <DataTable headers={userHeaders} dataRows={userDataRows}/>
                    <FormButton type={type} form={<UserForm type={type}/>}/>
                </>
            );
        } catch (error) {
            console.error("Error fetching data: ", error);
        }
    };
    useEffect(() => {
        switch(name){
            case 'users':
                fetchUserData();
                break;
            case 'books':
                setContent(
                    <>
                        <DataTable headers={bookHeaders} dataRows={bookDataRows}/>
                        <FormButton type={type} form={<BookForm type={type} content={book}/>}/>
                    </>
                );
                break;
            case 'reviews':
                setContent(
                    <>
                        <DataTable headers={reviewHeaders} dataRows={reviewDataRows}/>
                        <FormButton type={type} form={<ReviewForm type={type} content={review}/>}/>
                    </>
                );
                break;
            case 'comments':
                setContent(
                    <>
                        <DataTable headers={commentHeaders} dataRows={commentDataRows}/>
                        <FormButton type={type} form={<CommentForm type={type} content={comment}/>}/>
                    </>
                );
                break;
            case 'roles':
                setContent(
                    <>
                        <DataTable headers={roleHeaders} dataRows={roleDataRows}/>
                    </>
                );
                break;
            case 'best':
                setContent(
                    <>
                        <DataTable headers={bestBookHeaders} dataRows={bestBookDataRows}/>
                    </>
                );
                break;
            default:
                setContent(<></>);
                break;
        }
    }, [name, type]);


    return (
        <BackOfficeLayout content={content}/>
    );
    
}

export default Acceuil;