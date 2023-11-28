// Pagination.js
import React from 'react';

const Pagination = ({ totalPages, currentPage, goToPage }) => {
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button key={i} onClick={() => goToPage(i)} disabled={i === currentPage}>
        {i}
      </button>
    );
  }

  return <div className="pagination">{pages}</div>;
};

export default Pagination;