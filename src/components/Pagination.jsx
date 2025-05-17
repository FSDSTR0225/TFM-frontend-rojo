import React from "react";

const Pagination = ({ currentPage, totalPages, handlePageChange, filteredProjects }) => {
  return (
    <div className="mt-4">

      {filteredProjects.length > 0 && (
        <p className="text-center text-sm text-[#797979]">
          Page {currentPage} of {totalPages} total
        </p>
      )}

      {totalPages > 1 && filteredProjects.length > 0 && (
        <div className="join flex justify-center mt-4">

          {currentPage > 1 && (
            <button
              className="join-item btn bg-[#171717] text-white border-none hover:bg-[#111]"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              «
            </button>
          )}

          <button
            className="join-item btn bg-[#111] text-white font-bold border-none cursor-default"
            disabled
          >
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <button
              className="join-item btn bg-[#171717] text-white border-none hover:bg-[#111]"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              »
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Pagination;
