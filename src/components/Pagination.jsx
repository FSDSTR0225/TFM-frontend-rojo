import React from "react";
import { PiCaretDoubleLeft, PiCaretDoubleRight, PiCaretLeft, PiCaretRight } from "react-icons/pi";

export const Pagination = ({ currentPage, totalPages, handlePageChange, filteredProjects }) => {
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
            <>
              <button
                className="join-item btn bg-[#171717] text-white border-none hover:bg-[#111]"
                onClick={() => handlePageChange(1)}
                aria-label="First page"
              >
                <PiCaretDoubleLeft />
              </button>

              <button
                className="join-item btn bg-[#171717] text-white border-none hover:bg-[#111]"
                onClick={() => handlePageChange(currentPage - 1)}
                aria-label="Previous page"
              >
                <PiCaretLeft />
              </button>
            </>
          )}

          <button
            className="join-item btn bg-[#111] text-white font-bold border-none cursor-default"
            disabled
          >
            {currentPage}
          </button>

          {currentPage < totalPages && (
            <>
              <button
                className="join-item btn bg-[#171717] text-white border-none hover:bg-[#111]"
                onClick={() => handlePageChange(currentPage + 1)}
                aria-label="Next page"
              >
                <PiCaretRight />
              </button>

              <button
                className="join-item btn bg-[#171717] text-white border-none hover:bg-[#111]"
                onClick={() => handlePageChange(totalPages)}
                aria-label="Last page"
              >
                <PiCaretDoubleRight />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
