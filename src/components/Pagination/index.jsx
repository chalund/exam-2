

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
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
                        className={`py-2 px-4 mx-6 rounded mb-5 border ${
                            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700 hover:text-white'
                        }`}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                </li>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`py-2 px-4 mx-1 rounded mb-5 ${
                                currentPage === number ? 'bg-gradient-to-t from-violet-500 to-violet-700 text-white font-bold' : 'border hover:bg-violet-700 hover:text-white'
                            }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        className={`py-2 px-4 mx-6 border rounded mb-5 ${
                            currentPage === Math.ceil(totalProducts / productsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-violet-700 hover:text-white'
                        }`}
                        disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
