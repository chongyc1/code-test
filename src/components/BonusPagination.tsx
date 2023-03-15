import React from 'react';

interface PaginationProps {
  currentPage: number,
  totalRecords: number,
  onPageChange: (pageNumber: number) => void;
}

const pageSized = 20;
const maxPagesToShow = 8;

const BonusPagination = ({ currentPage, totalRecords, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalRecords / pageSized);
  const halfMaxPagesToShow = Math.floor(maxPagesToShow / 2);

  let startPage: number;
  let endPage: number;

  if (totalPages <= maxPagesToShow) {
    //if there are not enough 8 pages option 
    startPage = 1;
    endPage = totalPages;
  } else if (currentPage <= halfMaxPagesToShow) {
    //to make sure first 4 pages no move
    startPage = 1;
    endPage = maxPagesToShow;
  } else if (currentPage + halfMaxPagesToShow >= totalPages) {
    //if current page + half is over total pages (prevent render over page) 
    startPage = totalPages - maxPagesToShow + 1;
    endPage = totalPages;
  } else {
    // if there are enough 8 pages to display, keep the active in middle~
    startPage = currentPage - halfMaxPagesToShow;
    endPage = currentPage + halfMaxPagesToShow - 1;
    // -1 because total 8 pages dont have a mid number, 
    //so -1 can prevent build 1 more page option
  }


  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return <>
    <h4>Pagination - Bonus Task</h4>
    <h5>Total Records: {totalRecords} </h5>
    <h5>Total Pages: {totalPages} </h5>
    <div className={totalPages === 0 ? 'hide' : ''}>
      <button className='page_btn' onClick={handlePrevClick} disabled={currentPage === 1}>
        &lt;
      </button>
      {pageNumbers.map((pageNumber) => (
        <button

          key={pageNumber}
          onClick={() => onPageChange(pageNumber)}
          className={`${pageNumber === currentPage ? 'active-page' : ''} page_btn`}
        >
          {pageNumber}
        </button>
      ))}
      <button className='page_btn' onClick={handleNextClick} disabled={currentPage === totalPages}>
        &gt;
      </button>
    </div>
  </>;
}

export default BonusPagination;