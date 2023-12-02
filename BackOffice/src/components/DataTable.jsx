// DataTable.js
import '../stylesheet/backoffice.css'
import {Link} from 'react-router-dom'
import DeleteButton from './DeleteButton'
import ModifyButton from './ModifyButton'
import { Popover, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import SearchBar from './searchBar';
import { FaLink } from "react-icons/fa";
import { FaCommentAlt } from "react-icons/fa";
import { FaRegCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import Pagination from './Pagination';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'

function DataTable({dataRows}) {
  const params = useParams();
  const elementsPerPage = 7;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  let headers = [];
  console.log("params.name: ", params.name);


switch (params.name) {
  case 'users':
    headers = ['ID', 'Username', 'Email', 'Role', 'Phone', 'Country', 'Newsletter', 'Delete', 'Modify'];
    break;
  case 'books':
    headers = ['ISBN', 'TITLE','RATING', 'AUTHOR','ILLUSTRATOR', 'DESCRIPTION', 'COUNTRY', 'GENRE', 'YEAR', 'PAGES', 'EDITOR','IMG', 'MODIFY', 'DELETE'];
    break;
  case 'comments':
    headers = ['ID', 'Comment', 'Book', 'User', 'Delete', 'Modify'];
    break;
  case 'reviews':
    headers = ['ID', 'Review', 'Book', 'User', 'Delete', 'Modify'];
    break;
  default:
    break;
}

  const handleSearch = (term) => {
    setSearchTerm(term ? term : "");
    setPage(1);
  };

  console.log("tableau dataRows: ", dataRows);
  
  const filteredRows = dataRows.filter((row) => {
    return row.some((cell) => {
      return cell.content.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  const totalPages = Math.ceil(filteredRows.length / elementsPerPage);
  const startIndex = (page - 1) * elementsPerPage;
  const endIndex = page * elementsPerPage;
  const rowsPerPage = filteredRows.slice(startIndex, endIndex);

  const goToPage = (pageNumber) => {
    setPage(pageNumber);
  };

  return (
    <>
      <div className='tableContainer'>
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        <table className="dataTable">
          <thead>
            <tr>
              {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {rowsPerPage.map((dataRow) => (
              <tr key={dataRow[0].content}>
                {dataRow.map((dr, index) => (
                  <td key={index}>
                    {dr.type === "text" ? (
                      dr.content
                    ) : dr.type === "deleteButton" ? (
                      <DeleteButton id={dataRow[0].content} />
                    ) : dr.type === "modifyButton" ? (
                      <ModifyButton id={dataRow[0].content} />
                    ) : dr.type === "infosButton" ? (
                      <>
                        <Popover content={dr.content} trigger="click">
                          <Button>
                            <FaCommentAlt />
                          </Button>
                        </Popover>
                      </>
                    ) : dr.type === "commentsButton" ? (
                      <Link to={'/comments/add/' + dataRow[0].content} ><FaLink /></Link>
                    ) : (dr.content ? (
                      <FaRegCheckCircle />
                    ) : (
                      <FaRegCircle />
                    ))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} currentPage={page} goToPage={goToPage} />
      </div>
    </>
  );
}

export default DataTable;
