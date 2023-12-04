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
import { set } from 'zod';

function DataTable() {
  const params = useParams();
  const elementsPerPage = 7;
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [headers, setHeaders] = useState([]);
  console.log("params.name: ", params.name);
  const [dataRows, setDataRows] = useState([]);
  const users = useSelector(state => state.users.users);
  const books = useSelector(state => state.books.books);
  const topRatedBooks =useSelector(state => state.best.bestBooks);
  const reviews = useSelector(state => state.reviews.reviews);
  const roles = useSelector(state => state.roles.roles);
  const actors = useSelector(state => state.actors.actors);

useEffect(() => {
  switch (params.name) {
    case 'users':
      setHeaders(['ID', 'USERNAME', 'EMAIL', 'PASSWORD', 'COUNTRY', 'PHONE NUMBER', 'NEWSLETTER', 'MODIFY', 'DELETE']);
      setDataRows(users);
      break;

    case 'books':
      setHeaders(['ISBN', 'TITLE','RATING', 'AUTHOR','ILLUSTRATOR', 'DESCRIPTION', 'COUNTRY', 'GENRE', 'YEAR', 'PAGES', 'EDITOR','IMG', 'MODIFY', 'DELETE']);
      setDataRows(books);
      break;

    case 'comments':
      setHeaders(['ID', 'AUTHOR', 'CONTENT', 'RATING', 'MODIFY', 'DELETE']);
      break;

    case 'reviews':
      setHeaders(['ID', 'AUTHOR', 'BOOK', 'CONTENT', 'TITLE', 'COMMENTS', 'RATING', 'EVAL', 'MODIFY', 'DELETE']);
      setDataRows(reviews);
      break;

    case 'roles':
      setHeaders(['ID', 'ROLE', 'ACTOR', 'BOOK']);
      setDataRows(roles);
      break;

    case 'actors':
      setHeaders(['ID', 'ACTOR','BOOKS']);
      setDataRows(actors);
      break;

    case 'best' : 
    setHeaders(['ISBN','TITLE', 'RATING']);
      setDataRows(topRatedBooks);
      break;
    default:
      console.log("default");
      setDataRows([]);
      break;
  }
  setPage(1);
}, [params.name, users, books, reviews, roles, actors]);

console.log("dataRows: ", dataRows);

  const handleSearch = (term) => {
    setSearchTerm(term ? term : "");
    setPage(1);
  };


  const filteredRows = dataRows.filter((row) => {
    return row.some((cell) => {
      return cell.content.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  console.log("filteredRows: ", filteredRows);

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
      {dataRows.length > 0 && (
        <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      )}
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
