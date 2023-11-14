import '../stylesheet/backoffice.css'
import {Link} from 'react-router-dom'
import DeleteButton from './DeleteButton'
import ModifyButton from './ModifyButton'
import { Popover, Button } from 'antd';
import React, { useState } from 'react';
import SearchBar from './searchBar';
import { FaLink } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

function DataTable({headers, dataRows, name}) {

  const elementsPerPage = 7; // Nombre d'éléments par page
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };
  // Filtrage en fonction de la recherche
  const filteredRows = dataRows.filter((row) =>
    row.some(
      (field) => field.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  //Calculer le nbre de pages nécessaires en arrondissant vers le haut
  const totalPages = Math.ceil(filteredRows.length / elementsPerPage);

  const goToPage = pageNumber => {
    setPage(pageNumber);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button key={i} onClick={() => goToPage(i)} disabled={i === page}>
        {i}
      </button>
    );
  }

  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = page * elementsPerPage;
  const rowsPerPage = filteredRows.slice(startIndex, endIndex);

  return (
    <>
      <div className='tableContainer'>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <table className="dataTable">
          <thead>
          <tr>
                    {
                        //write a loop to display the headers
                        headers.map(header => <th>{header}</th>)    
                    }
                </tr>
          </thead>

          <tbody>
          {
                    rowsPerPage.map((dataRow, rowIndex) => 
                    <tr key={rowIndex}>
                        {
                            dataRow.map(dr => 
                            <td>
                                {dr.type == "text" ? (
                                    dr.content
                                ): dr.type == "deleteButton" ?(
                                    <DeleteButton id={rowIndex}/>
                                ): dr.type == "modifyButton" ?(
                                    <ModifyButton id={rowIndex}/>
                                ): dr.type == "infosButton" ?(
                                    <>
                                     <Popover content={dr.content} trigger="click">
                                        <Button>
                                          <FaCommentAlt/>
                                        </Button>
                                    </Popover>
                                    </>
                                ): dr.type == "commentsButton" ?(
                                    <Link to='/comments/add'><FaLink/></Link>
                                ) : (dr.content === 'true' ? (
                                    <FaRegCheckCircle/>
                                  ):(
                                    <FaRegCircle/>
                                  )
                                )
                            }
                            </td>)
                        }
                    </tr>)}
          </tbody>
        </table>

        <div className="pagination">
          {pages}
        </div>
      </div>
    </>
  );
}

export default DataTable;