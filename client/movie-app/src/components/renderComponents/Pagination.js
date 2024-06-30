import React from 'react';

const Pagination = ({ totalPosts, postsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <button onClick={handlePrevPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
