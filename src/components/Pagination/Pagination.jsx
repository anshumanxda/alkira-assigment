import React from "react";
import BPagination from "react-bootstrap/Pagination";

import "./Pagination.css";

const Pagination = ({ totalPage, currentPage, onChange }) => {
  const handleClick = (e) => {
    const pageNo = e.currentTarget.dataset.page_no
    if (pageNo != currentPage)
      onChange?.(pageNo);
  }
  return (
    <div className="pagination-container">
      <BPagination size="md">
        <BPagination.Prev onClick={handleClick} data-page_no={currentPage - 1} disabled={currentPage == 1} />
        {Array(totalPage)
          .fill(1)
          .map((item, index) => (
            <BPagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={handleClick}
              data-page_no={index + 1}
              className='pagination-list'
            >
              {index + 1}
            </BPagination.Item>
          ))}
        <BPagination.Next onClick={handleClick} data-page_no={currentPage + 1} disabled={currentPage == totalPage} />
      </BPagination>
    </div>
  );
};

export default Pagination;
