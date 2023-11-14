import { useState } from 'react';
import '../../stylesheet/backoffice.css'
import { useNavigate } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function BookForm({content}){
    const params = useParams();
    const[title, setTitle] = useState(params.type === 'modify' ? content.title : '');
    const[author, setAuthor] = useState(params.type === 'modify' ? content.author : '');
    const[year, setYear] = useState(params.type === 'modify' ? content.year : '');
    const[genre, setGenre] = useState(params.type === 'modify' ? content.genre : '');
    const[country, setCountry] = useState(params.type === 'modify' ? content.country : '');
    const[pages, setPages] = useState(params.type === 'modify' ? content.pages : '');
    const[editor, setEditor] = useState(params.type === 'modify' ? content.editor : '');
    const[isbn, setIsbn] = useState(params.type === 'modify' ? content.isbn : '');
    const[summary, setSummary] = useState(params.type === 'modify' ? content.summary : '');
    const[illustrator, setIllustrator] = useState(params.type === 'modify' ? content.illustrator : '');
    const navigate = useNavigate();

    useEffect(() => {
        if(params.type === 'modify')
            {
                setTitle(content.title);
                setAuthor(content.author);
                setYear(content.year);
                setGenre(content.genre);
                setCountry(content.country);
                setPages(content.pages);
                setEditor(content.editor);
                setIsbn(content.isbn);
                setSummary(content.summary);
                setIllustrator(content.illustrator);
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
            }
    }, [params.type]);

// write the handleSubmit function here
const handleSubmit = (e) => {
        
    e.preventDefault();
    const book = {
        title,
        author,
        year,
        genre,
        country,
        pages,
        editor,
        isbn,
        summary,
        illustrator
    };
    // empty the form
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

    if(params.type === 'add') 
        {
            // Show the information in a pop-up window
            alert("The book has been added to the database");
        }
    else if(params.type === 'modify')
        {
            // Show the information in a pop-up window
            alert("The book has been modified");
            navigate('/books/add');
        }
    console.log(book);
};


    return(
        //write the form here
        <>          
            <form onSubmit={handleSubmit}>
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
                    <label className="field">Country:
                        <br/>
                        <select 
                        name="country" 
                        value={country} onChange={e => setCountry(e.target.value)}>
                            <option value="australia">Australia</option>
                            <option value="canada">Canada</option>
                            <option value="usa">USA</option>
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
                    <input type="submit" value="Submit" />
            </form>
                
           
        </>
    );
}
export default BookForm;