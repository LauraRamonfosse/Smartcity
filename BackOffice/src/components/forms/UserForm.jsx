import '../../stylesheet/backoffice.css';
import {sendForm as APISendForm } from '../../API/user';
import { updateUser, getUserById } from '../../API/user';
import {useParams, useNavigate} from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import countriesList from '../Countries';
import { userSchema } from './ValidationSchemas';



function UserForm(){
    const params = useParams();
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[country, setCountry] = useState('');  
    const[email, setEmail] = useState('');
    const[role, setRole] = useState('user');
    const[phone, setPhone] = useState('');
    const[newsletter, setNewsletter] = useState(false);
    const avatar = useRef(null);

    const navigate = useNavigate();
    const token = useSelector(state => state.token);

    useEffect(() => {
        if(params.type === 'modify'){
            // use getUserById to get the user data from the database
            getUserById(parseInt(params.id), token)
            .then((response) => {
                setUsername(response.username);
                setPassword('');
                setPassword2('');
                setCountry(response.country);
                setEmail(response.email_address);
                setRole(response.role);
                setPhone(response.phone_number);
                setNewsletter(response.news_letter);
            })
            .catch((error) => {
                console.log(error);
            });           
        }
        else if(params.type === 'add'){
            setUsername('');
            setPassword('');
            setPassword2('');
            setCountry('');
            setEmail('');
            setPhone('');
            setNewsletter(false);
        }
    }, [params.type]);

// write the handleSubmit function here
async function sendForm (event) {
    const formData = new FormData();
    event.preventDefault();
    formData.append('id', params.id);
    formData.append('username', username);
    formData.append('email_address', email);
    formData.append('password', password);
    formData.append('role', role);
    formData.append('country', country);
    formData.append('phone_number', phone);
    formData.append('news_letter', newsletter);
    formData.append('image', avatar.current);
    if(params.type === 'add'){
            // formData.append('avatar', avatar.current);
            try {
                userSchema.parse({
                    username,
                    email_address: email,
                    password,
                    role,
                    country,
                    phone_number: phone,
                    news_letter: newsletter
                });
                await APISendForm(formData, token);
                //write the alert here
                alert('The user has been added to the database');
                navigate(0);
            } catch (e) {
                console.log(e);
            }
        } else if(params.type === 'modify'){

            // formData.append('avatar', avatar.current);
            try {
                await updateUser(formData, token);
                //write the alert here
                alert('The user has been modified in the database');
                navigate('/users/add');
            } catch (e) {
                console.log(e);
            }
        }
}

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                    <label className="field">Username:
                        <br/>
                        <input 
                        type="text" 
                        name="username"
                        placeholder='Insert...'
                        value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <label className="field">Password:
                        <br/>
                        <input 
                        type="password" 
                        name="password" 
                        placeholder='Insert...'
                        value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <label className="field">Confirm Password:
                        <br/>
                        <input 
                        type="password" 
                        name="password2" 
                        placeholder='Insert...'
                        value={password2} onChange={e => setPassword2(e.target.value)} />
                    </label>
                    <label className="field">Email:
                        <br/>
                        <input 
                        type="email" 
                        name="email"
                        placeholder='Insert...' 
                        value={email} onChange={e => setEmail(e.target.value)} />
                    </label>
                    <label className="field">Role:
                        <br/>
                        <select 
                        name="role" 
                        value={role} onChange={e => setRole(e.target.value)}>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </label>
                    <label className="countryField">Country:
                        <br/>
                        <select 
                            name="country" 
                            value={country} 
                            onChange={e => setCountry(e.target.value)}
                        >
                            <option value="">Select a country</option>
                            {
                                countriesList.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))
                            }
                        </select>
                    </label>
                    <label className="field">Phone:
                        <br/>
                        <input 
                        type="tel" 
                        name="phone" 
                        placeholder='Insert...'
                        value={phone} onChange={e => setPhone(e.target.value)} />
                    </label>
                    <label className="field">Avatar:
                        <br/>
                        <input 
                        type={'file'}
                        accept={'image/*'}
                        onChange={(e) => avatar.current = e.target.files[0]}
                        ref={avatar} />
                    </label>
                    <label className="field"> 
                        <input 
                        type="checkbox" 
                        name="newsletter" 
                        checked={newsletter} onChange={e => setNewsletter(e.target.checked)} />
                        Subscribe to Newsletter: 
                    </label>
                    <input type="submit" value="Submit" />
            </form>
                
           
        </>
    );
}
export default UserForm;
