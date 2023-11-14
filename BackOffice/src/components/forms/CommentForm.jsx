import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function CommentForm({content}){
    const params = useParams();
    const[text, setText] = useState(params.type === 'modify' ? content.text : '');
    const navigate = useNavigate();

    useEffect(() => {
        if(params.type === 'modify'){
            setText(content.text);
        }
        else{
            setText('');
        }
    }, [params.type]);

// write the handleSubmit function here
    const handleSubmit = (e) => {
        e.preventDefault();

        // empty the form
        setContent('');
        if(params.type === 'add')
            {
                // Show the information in a pop-up window
                alert("The comment has been added to the database");
            }
        else if(params.type === 'modify')
            {
                // Show the information in a pop-up window
                alert("The comment has been modified");
                navigate('/comments/add');
            }
    };

    return(
        //write the form here
        <>          
            <form onSubmit={handleSubmit}>
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

export default CommentForm;