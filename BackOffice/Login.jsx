import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheet/backoffice.css';
import { login } from '../../API/user';
import { useState } from 'react';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    // Write a function that will handle the login form submission
    // It should prevent the default action of the event
    // It should log the username and password to the console
    // It should clear the form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('username:', username);
        console.log('password:', password);
        login(username, password);
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
                    value = {username} onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label className="field">Password:
                    <br/>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Insert...' 
                    value = {password} onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default Login;