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

function DataTable({headers, dataRows}) {

  const elementsPerPage = 7; // Nombre d'éléments par page
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    console.log("user: ", term);
    setSearchTerm(term? term : "");
    setPage(1);
  };
  // Filtrage en fonction de la recherche
  const filteredRows = dataRows.filter((row) => {
    return row.some((cell) => {
      return cell.content.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  console.log("searchTerm: ", searchTerm);


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
  console.log("rowsPerPage: ", rowsPerPage);
  console.log("startIndex: ", startIndex);
  console.log("endIndex: ", endIndex);
  console.log("filtered rows: ", filteredRows);

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
                    rowsPerPage.map((dataRow) => 
                    <tr key={dataRow[0].content}>
                        {
                            dataRow.map(dr => 
                            <td>
                                {dr.type == "text" ? (
                                    dr.content
                                ): dr.type == "deleteButton" ?(
                                    <DeleteButton id={dataRow[0].content}/>
                                ): dr.type == "modifyButton" ?(
                                    <ModifyButton id={dataRow[0].content}/>
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
                                ) : (dr.content ? (
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