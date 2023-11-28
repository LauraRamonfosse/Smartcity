import React, { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function RoleForm(){
    const params = useParams();
    const [name, setName] = useState(params.type === 'modify' ? content.name : '');
    const [description, setDescription] = useState(params.type === 'modify' ? content.description : '');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(params.type === 'add')
            {
                // Show the information in a pop-up window
                alert("The role has been added to the database");
            }
        else if(params.type === 'modify')
            {
                // Show the information in a pop-up window
                alert("The role has been modified");
                
            }
    };

    useEffect(() => {
        if(params.type === 'modify'){
            setName(content.name);
            setDescription(content.description);
        }
        else{
            setName('');
            setDescription('');
        }
    }, [params.type]);

    return(
        //write the form here
        <>          
            <form onSubmit={handleSubmit}>
                    <label className="field">Name:
                        <br/>
                        <input
                        type="text"
                        name="name"
                        placeholder='Insert...'
                        value={name} onChange={e => setRole(e.target.value)} />
                    </label>
                    <label className="field">Description:
                        <br/>
                        <input
                        type="text"
                        name="description"
                        placeholder='Insert...'
                        value={description} onChange={e => setRole( e.target.value)} />
                    </label> 
                    <input type="submit" value="Submit" />
            </form>
        </>
    );  
}

export default RoleForm;