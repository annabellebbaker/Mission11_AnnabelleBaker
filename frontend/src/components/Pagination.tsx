// building a pagination component just like we had before
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalNumBooks: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <div>
      {/* Pagination navigation */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary me-2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline-primary mx-1 ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-primary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* Results per page */}
      <div className="d-flex justify-content-center align-items-center mb-3">
        <label className="me-2 mb-0" htmlFor="pageSizeSelect">
          Results per page:
        </label>
        <select
          id="pageSizeSelect"
          className="form-select w-auto"
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // reset to page 1
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;
