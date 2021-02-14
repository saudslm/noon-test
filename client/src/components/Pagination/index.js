import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

const Pagination = props => {
  const { page, itemsOnPage, handlePageChange } = props;

  // handle next/prev click
  const handleClick = e => {
    e.preventDefault();
    if (e.target.className === 'next-link') {
      handlePageChange(page + 1)
    } else {
      handlePageChange(page - 1)
    }
  }

  return (
    <div className="pagination">
      <a className={page > 1 ? "previous-link" : "disabled-link previous-link"} onClick={handleClick}>Previous</a>
      <a className={itemsOnPage < 10 ? "disabled-link next-link" : "next-link"} onClick={handleClick}>Next</a>
      <span className="page-span">Page {page} of many.</span>
    </div>
  );
}

// prop types
Pagination.propTypes = {
  page: PropTypes.number,
  itemsOnPage: PropTypes.number,
  handlePageChange: PropTypes.func
};

export default Pagination;