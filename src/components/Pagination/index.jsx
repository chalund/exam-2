const Pagination = ({
  productsPerPage,
  totalProducts,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="mt-4">
      <ul className="flex justify-center">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            className={`hidden md:block mx-6 mb-5 rounded border px-4 py-2 ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-violet-700 hover:text-white"
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`mx-1 mb-5 rounded px-4 py-2 ${
                currentPage === number
                  ? "bg-gradient-to-t from-violet-500 to-violet-700 font-bold text-white"
                  : "border hover:bg-violet-700 hover:text-white"
              }`}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            className={`hidden md:block mx-6 mb-5 rounded border px-4 py-2 ${
              currentPage === Math.ceil(totalProducts / productsPerPage)
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-violet-700 hover:text-white"
            }`}
            disabled={
              currentPage === Math.ceil(totalProducts / productsPerPage)
            }
          >
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
