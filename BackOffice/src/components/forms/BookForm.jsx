import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { bookSchema } from './ValidationSchemas';
import { sendForm as APISendForm, updateBook as APIUpdateBook, getBookById } from '../../API/book'

function BookForm(){
    const params = useParams();
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const[year, setYear] = useState('');
    const[genre, setGenre] = useState('');
    const[country, setCountry] = useState('');
    const[pages, setPages] =useState('');
    const[editor, setEditor] = useState('');
    const[rating,setRating] = useState('');
    const[isbn, setIsbn] = useState('');
    const[summary, setSummary] = useState('');
    const[illustrator, setIllustrator] = useState('');
    const[image, setImage] = useState('');
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);

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
            
                getBookById(params.id)
                .then((response) => {
                    setTitle(response.title);
                    setAuthor(response.author);
                    setYear(response.released_year.toString());
                    setGenre(response.genre);
                    setCountry(response.country || '');
                    setPages(response.pages);
                    setEditor(response.publishing_house);
                    setIsbn(response.isbn);
                    setSummary(response.description);
                    setIllustrator(response.illustrator);
                    setImage(response.img_path);
                    setRating(response.rating);
                })
                .catch((error) => {
                    console.log(error);
                });
            }
            else if(params.type === 'add')
            {
                setTitle(undefined);
                setAuthor(undefined);
                setYear(undefined);
                setGenre(undefined);
                setCountry(undefined);
                setPages(undefined);
                setEditor(undefined);
                setIsbn(undefined);
                setSummary(undefined);
                setIllustrator(undefined);
                setImage(undefined);
                setRating(undefined);
            }
    }, [params.type]);


// write the handleSubmit function here
async function sendForm (event) {
    const formData = new FormData();
    event.preventDefault();
      // Validate form data
  try {
    bookSchema.parse({
      title,
      author,
      year,
      genre,
      country,
      pages: parseInt(pages),  // Parse pages as an integer
      editor,
      isbn,
      summary,
      illustrator,
      image,
    });
    // empty the form
    setTitle(undefined);
    setAuthor(undefined);
    setYear(undefined);
    setGenre(undefined);
    setCountry(undefined);
    setPages(undefined);
    setEditor(undefined);
    setIsbn(undefined);
    setSummary(undefined);
    setIllustrator(undefined);
    setRating(undefined);
    switch (params.type) {
        case 'add':
            formData.append('isbn', isbn);
            formData.append('title', title);
            formData.append('author', author);
            formData.append('released_year', year);
            formData.append('genre', genre);
            formData.append('country', country);
            formData.append('pages', pages);
            formData.append('description', summary);
            formData.append('illustrator', illustrator);
            formData.append('publishing_house', editor);
            formData.append('img_path', image);
            console.log("COUNTRY : ", country);
            try {
                await APISendForm(formData, token);
                alert('The book has been added to the database')
            } catch (error) {
                // Si une erreur se produit, vous pouvez traiter l'erreur ici
                console.error("Error adding book:", error);
    
                // Affichez une alerte ou effectuez toute autre action en cas d'erreur
                alert('Failed to add the book. Please check your input and try again.');
            }
        case 'modify':
            console.log("params.isbn : ", typeof(params.id));
            formData.append('isbn', params.id);
            formData.append('title', title);
            formData.append('author', author);
            formData.append('released_year', year);
            formData.append('genre', genre);
            formData.append('country', country);
            formData.append('pages', pages);
            formData.append('description', summary);
            formData.append('illustrator', illustrator);
            formData.append('publishing_house', editor);
            formData.append('img_path', image);
            // formData.append('avatar', avatar.current);
            try {
                await APIUpdateBook(formData,token);
                //write the alert here
                navigate('/books/add');
                alert('The book has been modified in the database');
            } catch (e) {
                console.log(e);
            }
            break;
        }
    }
    catch (error) {
        // If validation fails, handle the error
        if (error && error.errors) {
          const validationErrors = error.errors.map((fieldError) => ({
            fieldName: fieldError.path.join('.'),
            error: fieldError.message,
          }));
      
          const errorMessage = validationErrors
            .map(({ fieldName, error }) => `${fieldName}: ${error}`)
            .join('\n');
      
          console.error('Validation error:', validationErrors);
          alert(`Form submit failed:\n${errorMessage}`);
        } else {
          // Handle the case where error or error.errors is undefined or null
          console.error('Unexpected validation error:', error);
          alert('Please, fill in all the mandatory fields.');
        }
      }
      
      
      
}

    return(
        //write the form here
        <>          
            <form onSubmit={sendForm}>
                    <label className="field">Title:
                        <br/>
                        <input
                        type="text"
                        name="title"
                        placeholder='Insert...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="field">Editor:
                        <br/>
                        <input
                        type="text"
                        name="editor"
                        placeholder='Insert...'
                        value={editor} onChange={e => setEditor(e.target.value)} />
                    </label> 

                    <label className="countryField">Country:
                        <br/>
                        <select 
                            name="country" 
                            value={country} 
                            onChange={e => setCountry(e.target.value)}
                        >
                            <option value="">Select a country</option> {/* Ajoutez cette ligne */}
                            {
                                countriesList.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label className="field">ISBN:
                        <br/>
                        <input
                        type="text"
                        name="isbn"
                        placeholder='Insert...'
                        value={isbn} onChange={e => setIsbn(e.target.value)} />
                    </label>
                    <label className="field">Author:
                        <br/>
                        <input
                        type="text"
                        name="author"
                        placeholder='Insert...'
                        value={author} onChange={e => setAuthor(e.target.value)} />
                    </label>
                    <label className="field">Year:
                        <br/>
                        <input
                        type="text"
                        name="year"
                        placeholder='Insert...'
                        value={year} onChange={e => setYear(e.target.value)} />
                    </label>
                    <label className="field">Pages:
                        <br/>
                        <input
                        type="text"
                        name="pages"
                        placeholder='Insert...'
                        value={pages} onChange={e => setPages(e.target.value)} />
                    </label>
                    <label className="field">Genre:
                        <br/>
                        <input
                        type="text"
                        name="genre"
                        placeholder='Insert...'
                        value={genre} onChange={e => setGenre(e.target.value)} />
                    </label>                    
                    <label className="largeField">Summary:
                        <br/>
                        <textarea
                        id="summary"
                        name="summary"
                        placeholder='Insert...'
                        value={summary} onChange={e => setSummary(e.target.value)} />
                    </label>
                    <label className="field">Illustrator:
                        <br/>
                        <input
                        type="text"
                        name="illustrator"
                        placeholder='Insert...'
                        value={illustrator} onChange={e => setIllustrator(e.target.value)} />
                    </label>
                    <label className="field">Image:
                        <br/>
                        <input
                        type="text"
                        name="image"
                        placeholder='Insert...'
                        value={image} onChange={e => setImage(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
            </form>
                
           
        </>
    );
}
export default BookForm;