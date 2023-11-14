import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function ReviewForm({content}){
    const params = useParams();
    const[title, setTitle] = useState(params.type === 'modify' ? content.title : '');
    const[book, setBook] = useState(params.type === 'modify' ? content.book : '');
    const[text, setText] = useState(params.type === 'modify' ? content.text : '');
    const navigate = useNavigate();

// write the handleSubmit function here
    const handleSubmit = (e) => {
        e.preventDefault();
        // empty the form
        setTitle('');
        setBook('');
        setText('');

        const review = {
            title,
            book,
            text
        };
        
        if(params.type === 'add')
            {
                // Show the information in a pop-up window
                alert("The review has been added to the database");
            }
        else if(params.type === 'modify')
            {
                // Show the information in a pop-up window
                alert("The review has been modified");
                navigate('/reviews/add');
            }
        console.log(review);
    };

    useEffect(() => {
        if(params.type === 'modify'){
            setTitle(content.title);
            setBook(content.book);
            setText(content.text);
        }
        else{
            setTitle('');
            setBook('');
            setText('');
        }
    }, [params.type]);

    return(
        //write the form here
        <>          
            <form onSubmit={handleSubmit}>
                    <label className="field">Title:
                        <br/>
                        <input
                        type="text"
                        name="title"
                        placeholder='Insert...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="field">Book:
                        <br/>
                        <input
                        type="text"
                        name="book"
                        placeholder='Insert...'
                        value={book} onChange={e => setBook(e.target.value)} />
                    </label> 
                    <label className="largeField">Text:
                        <br/>
                        <textarea
                        id="text"
                        name="text"
                        placeholder='Insert...'
                        value={text} onChange={e => setText(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default ReviewForm;
