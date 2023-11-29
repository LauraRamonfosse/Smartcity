import { useState } from 'react';
import '../../stylesheet/backoffice.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { sendForm as APISendForm } from '../../API/reviews';
import { updateReview as APIUpdateReview } from '../../API/reviews';
import { getReviewById } from '../../API/reviews';

function ReviewForm(){
    const params = useParams();
    const[user, setUser] = useState('');
    const[book, setBook] = useState('');
    const[title, setTitle] = useState('');
    const[content, setContent] = useState('');
    const[rating, setRating] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if(params.type === 'modify'){
            getReviewById(parseInt(params.id))
            .then((response) => {
                setUser(response.user_id);
                setBook(response.book_id);
                setTitle(response.title);
                setContent(response.content);
                setLikesCounter(response.likes_counter);
                setDislikesCounter(response.dislikes_counter);
                setRating(response.rating); 
            }).catch((error) => {
                console.log(error);
            });
        }
        else if(params.type === 'add'){
            setBook('');
            setTitle('');
            setContent('');
            setRating('');
        }
    }, [params.type]);


    async function sendForm(event){
        const formData = new FormData();
        event.preventDefault();
        switch (params.type) {
            case 'add':
                formData.append('book_id', book);
                formData.append('title', title);
                formData.append('content', content);
                formData.append('rating', rating);
                try {
                    await APISendForm(formData);
                    console.log('OK');
                    alert('The review has been added to the database');
                    navigate('/reviews/add');
                } catch (e) {
                    console.log(e);
                }
                break;
            case 'modify':
                formData.append('title', title);
                formData.append('content', content);
                formData.append('rating', rating);
                try {
                    await APIUpdateReview(params.id, formData);
                    console.log('OK');
                    alert('The review has been modified');
                    navigate('/reviews/add');
                } catch (e) {
                    console.log(e);
                }
                break;             
        }
        navigate(0);
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>

                    <label className="field">Book:
                        <br/>
                        <input
                        type="text"
                        name="book"
                        placeholder='Insert...'
                        value={book} onChange={e => setBook(e.target.value)} />
                    </label>
                    <label className="field">Title:
                        <br/>
                        <input
                        type="text"
                        name="title"
                        placeholder='Insert...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="largeField">Content:
                        <br/>
                        <textarea
                        type="text"
                        name="contentReview"
                        placeholder='Insert...'
                        value={content} onChange={e => setContent(e.target.value)} />
                    </label>
                    <label className="field">Rating:
                        <br/>
                        <input
                        type="number"
                        name="rating"
                        placeholder='Insert...'
                        value={rating} onChange={e => setRating(e.target.value)} />
                    </label> 
                    <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ReviewForm;
