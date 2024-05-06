import React, { useState } from 'react';
import { useFetch } from '../Hooks/useFetch';
import { BASE_URL, Venues } from '../API';
import Spinner from '../Spinner/Loader';
import { IoCloseOutline } from "react-icons/io5";
import Pagination from '../Pagination';
import { BiSearch } from "react-icons/bi";
import ProductCard from '../card';

function ProductList() {
    const { data, loading, error } = useFetch(BASE_URL + Venues);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(24);

    if (loading) {
        return (
            <div className="text-center text-2xl">
                <Spinner />
            </div>
        );
    }

    if (error) {
        return <div>Error fetching data: {error.message}</div>;
    }

    const handleClearInput = () => {
        setSearchTerm("");
    };

    const filteredProducts = data.data.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="flex flex-col items-center">
            <div className="mx-auto  bg-gradient-to-t from-violet-500 to-violet-700 w-full max-w-[990px] mt-10 my-6 p-8 flex flex-col items-center rounded-xl">
                <h1 className="text-white mb-4 text-2xl md:text-3xl font-medium capitalize">Find your new destination today</h1>
                <div className="relative w-full max-w-[600px] bg-white rounded-xl shadow-md flex items-center">
                    <BiSearch size={24} className="text-gray-800 absolute left-3 top-0 mt-2 ml-2" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-full pl-12 pr-16 py-2 border-0 "
                    />
                    <IoCloseOutline
                        size={30}
                        onClick={handleClearInput}
                        className="cursor-pointer absolute right-0 top-0 mt-2 mr-3 text-gray-800"
                    />
                </div>
            </div>
            <div className="w-full max-w-[990px] flex flex-wrap justify-center">
                <ProductCard venues={currentProducts} />
            </div>
            <div className='py-6'>
            <Pagination
                productsPerPage={productsPerPage}
                totalProducts={filteredProducts.length}
                currentPage={currentPage}
                paginate={paginate}
            />
            </div>
          
        </div>
    );
}

export default ProductList;
