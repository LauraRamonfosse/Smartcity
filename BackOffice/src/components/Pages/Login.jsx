import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheet/backoffice.css';


function Login() {
    const navigate = useNavigate();
    
    // Write a function that will handle the login form submission
    // It should prevent the default action of the event
    // It should log the username and password to the console
    // It should clear the form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("The form has been submitted");
        navigate('/acceuil');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="field">Username:
                    <br/>
                    <input 
                    type="text" 
                    name="username" 
                    placeholder='Insert...' 
                    />
                </label>
                <label className="field">Password:
                    <br/>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Insert...' 
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default Login;