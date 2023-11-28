import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { sendForm as APISendForm } from '../../API/comments';
import { updateComment as APIUpdateComment } from '../../API/comments';
import { getComment } from '../../API/comments';

function CommentForm(){
    const params = useParams();
    const[content, setContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(params.type === 'modify'){
            getComment(parseInt(params.id))
            .then((response) => {
                setContent(response.content);
            }).catch((error) => {
                console.log(error);
            });
        }
        else if (params.type === 'add'){
            setContent('');
        }
    }, [params.type]);

// write the handleSubmit function here
    const sendForm = async (event) => {
        const formData = new FormData();
        event.preventDefault();
        switch (params.type) {
            case 'add':
                formData.append('content', content);
                try {
                    await APISendForm(formData);
                    console.log('OK');
                    alert('The comment has been added to the database');
                    navigate('/comments/add');
                } catch (e) {
                    console.log(e);
                    alert('An error occured');
                }
                break;

            case 'modify':
                formData.append('content', content);
                try {
                    await APIUpdateComment(parseInt(params.id), formData);
                    console.log('OK');
                    alert('The comment has been modified');
                    navigate('/comments/add');
                } catch (e) {
                    console.log(e);
                    alert('An error occured');
                }
                break;
        }
    }

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                <label htmlFor="content">Content</label>
                <input 
                    type="text" 
                    name="content" 
                    value={content} onChange={(event) => setContent(event.target.value)}/>
                <input type="submit" value="Submit"/>
            </form>
        </>
    );
}

export default CommentForm;