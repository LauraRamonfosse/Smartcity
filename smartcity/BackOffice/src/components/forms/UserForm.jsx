import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';  

function UserForm({content}){
    const params = useParams();
    const[username, setUsername] = useState(params.type === 'modify' ? content.username : '');
    const[password, setPassword] = useState('');
    const[password2, setPassword2] = useState('');
    const[country, setCountry] = useState(params.type === 'modify' ? content.country : '');  
    const[email, setEmail] = useState(params.type === 'modify' ? content.email : '');
    const[phone, setPhone] = useState(params.type === 'modify' ? content.phone : '');
    const[newsletter, setNewsletter] = useState(params.type === 'modify' ? content.newsletter : false);
    const navigate = useNavigate();

    const countriesList = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Australia',
        'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin',
        'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi',
        'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia',
        'Comoros', 'Congo (Congo-Brazzaville)', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czechia (Czech Republic)',
        'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea',
        'Estonia', 'Eswatini (fmr. "Swaziland")', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 'Georgia', 'Germany',
        'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Holy See', 'Honduras', 'Hungary',
        'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan',
        'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
        'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
        'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 'Mozambique', 'Myanmar (formerly Burma)',
        'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia (formerly Macedonia)',
        'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine State', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Poland',
        'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa',
        'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Slovakia',
        'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
        'Sweden', 'Switzerland', 'Syria', 'Tajikistan', 'Tanzania', 'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
        'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States of America', 'Uruguay',
        'Uzbekistan', 'Vanuatu', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe',
      ];


    useEffect(() => {
        if(params.type === 'modify'){
            setUsername(content.username);
            setPassword(content.password);
            setPassword2(content.password2);
            setCountry(content.country);
            setEmail(content.email);
            setPhone(content.phone);
            setNewsletter(content.newsletter);
            
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
const handleForm = (e) => {
    e.preventDefault();
    // empty the form
    setUsername('');
    setPassword('');
    setPassword2('');
    setCountry('');
    setEmail('');
    setPhone('');
    setNewsletter(false);
    if (params.type === 'add') {
        // Show the information in a pop-up window
        alert('The user has been added to the database');
    } else if (params.type === 'modify') {
        // Set shouldNavigate to true to trigger the navigation in useEffect
        navigate('/users/add');
        // Show the information in a pop-up window
        alert('The user has been modified');
      }
};

    return(
        //write the form here
        <>          
            <form onSubmit={handleForm}>
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
                    <label className="countryField">Country:
                        <br/>
                        <select 
                        name="country" 
                        value={country} onChange={e => setCountry(e.target.value)}>
                            {
                                countriesList.map((country) => (
                                    <option value={country}>{country}</option>
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