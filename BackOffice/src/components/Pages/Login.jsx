import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../stylesheet/backoffice.css';
import { useState } from 'react';
import { login } from '../../API/user';
import { useDispatch } from 'react-redux';
import { setToken } from '../../store/authSlice';


function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const APILogin = async () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            console.log('Before login'); // Debug line
            const token = (await login(formData)).token;
            console.log('After login'); // Debug line
            console.log('token: ', token);
            console.log('After context'); // Debug line
            // store the token in the local storage
            // redirect to the home page
            dispatch(setToken(token));
            navigate('/Acceuil');
        } catch (e) {
            alert('Wrong username or password');
        }
    };

    // Write a function that will handle the login form submission
    // It should prevent the default action of the event
    // It should log the username and password to the console
    // It should clear the form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username: ' + username + ' Password: ' + password);
        APILogin();
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
                    value={username} onChange={e => setUsername(e.target.value)}
                    />
                </label>
                <label className="field">Password:
                    <br/>
                    <input 
                    type="password" 
                    name="password" 
                    placeholder='Insert...' 
                    value={password} onChange={e => setPassword(e.target.value)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}

export default Login;