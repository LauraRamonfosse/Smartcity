import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { bookSchema } from './ValidationSchemas';
import { sendForm as APISendForm, updateBook as APIUpdateBook, getBookById } from '../../API/book'
import countriesList from '../Countries';
import { setBook, updateBook } from '../../store/slice/bookSlice';
import { useDispatch } from 'react-redux';

function BookForm(){
    const params = useParams();
    const[title, setTitle] = useState('');
    const[author, setAuthor] = useState('');
    const[year, setYear] = useState('');
    const[genre, setGenre] = useState('');
    const[country, setCountry] = useState('');
    const[pages, setPages] =useState('');
    const[editor, setEditor] = useState('');
    const[isbn, setIsbn] = useState('');
    const[summary, setSummary] = useState('');
    const[illustrator, setIllustrator] = useState('');
    const[image, setImage] = useState('');
    const navigate = useNavigate();
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();


    useEffect(() => {
        if(params.type === 'modify'){
            
                getBookById(params.id, token)
                .then((response) => {
                    console.log("response: ", response);
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
                })
                .catch((error) => {
                    console.log("error: ", error);
                });
            }
            else if(params.type === 'add')
            {
                setTitle('');
                setAuthor('');
                setYear('');
                setGenre('');
                setCountry('');
                setPages('');
                setEditor('');
                setIsbn('');
                setSummary('');
                setIllustrator('');
                setImage('');
            }
    }, [params.type]);


// write the handleSubmit function here
async function sendForm (event) {
    const formData = new FormData();
    console.log("sendForm");
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
    console.log("send form 2");
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
    formData.append('image', image);
    console.log("formData: ", formData);
    console.log("send form 3");
    console.log("params.type: ", params.type);
    const bookData = [
        {type: 'text', content:isbn},
        {type: 'text', content: title},
        {type: 'text', content: summary},
        {type: 'text', content: country},
        {type: 'text', content: genre},
        {type: 'text', content: year},
        {type: 'text', content: pages},
        {type: 'text', content: editor},
        {type: 'text', content: image},
        {type: 'modifyButton', content: 'Modify'},
        {type: 'deleteButton', content: 'Delete'}
    ]

        if(params.type === 'add'){

            console.log("send form 4");
            try {
                console.log("send form 5");
                await APISendForm(formData, token);
                alert('The book has been added to the database');
                dispatch(setBook(bookData));
            } catch (error) {
                // Si une erreur se produit, vous pouvez traiter l'erreur ici
                console.error("Error adding book:", error);
    
                // Affichez une alerte ou effectuez toute autre action en cas d'erreur
                alert('Failed to add the book. Please check your input and try again.');
            }
        }
        else if(params.type === 'modify'){
            // formData.append('avatar', avatar.current);
            try {
                console.log("token update", token);
                await APIUpdateBook(formData,token);
                //write the alert here
                alert('The book has been modified in the database');
                dispatch(updateBook(bookData));
            } catch (e) {
                console.log(e);
            }
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
                        required
                        placeholder='Insert...'
                        value={title} onChange={e => setTitle(e.target.value)} />
                    </label>
                    <label className="field">Editor:
                        <br/>
                        <input
                        type="text"
                        name="editor"
                        required
                        placeholder='Insert...'
                        value={editor} onChange={e => setEditor(e.target.value)} />
                    </label> 

                    <label className="countryField">Country:
                        <br/>
                        <select 
                            name="country" 
                            required
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
                        required
                        placeholder='Insert...'
                        value={isbn} onChange={e => setIsbn(e.target.value)} />
                    </label>
                    <label className="field">Author:
                        <br/>
                        <input
                        type="text"
                        name="author"
                        required
                        placeholder='Insert...'
                        value={author} onChange={e => setAuthor(e.target.value)} />
                    </label>
                    <label className="field">Year:
                        <br/>
                        <input
                        type="text"
                        name="year"
                        required
                        placeholder='Insert...'
                        value={year} onChange={e => setYear(e.target.value)} />
                    </label>
                    <label className="field">Pages:
                        <br/>
                        <input
                        type="text"
                        name="pages"
                        required
                        placeholder='Insert...'
                        value={pages} onChange={e => setPages(e.target.value)} />
                    </label>
                    <label className="field">Genre:
                        <br/>
                        <input
                        type="text"
                        name="genre"
                        required
                        placeholder='Insert...'
                        value={genre} onChange={e => setGenre(e.target.value)} />
                    </label>                    
                    <label className="largeField">Summary:
                        <br/>
                        <textarea
                        id="summary"
                        name="summary"
                        required
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
                    <label>Image:</label>
                        <br/>
                        <input
                            type={"file"}
                            accept={"image/*"}
                            onChange={(e) =>setImage(e.target.files[0])}
                        />
                     <input type="submit" value="Submit" />
            </form>
                
           
        </>
    );
}
export default BookForm;