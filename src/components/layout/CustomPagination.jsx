import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from 'react-js-pagination'; // Correct import

function CustomPagination({ resPerPage, filterProductCount }) {
    const [currentPage, setCurrentPage] = useState();

    let [searchParams] = useSearchParams();
    const navigate=useNavigate()

    const page = Number(searchParams.get("page")) || 1;

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const setCurrentPageNo = (pageNumber) => {
        setCurrentPage(pageNumber)

        if(searchParams.has("page")){
            searchParams.set("page",pageNumber)
        }else{
            searchParams.append("page",pageNumber)
        }
        const path=window.location.pathname+ "?" + searchParams.toString();
        navigate(path)
    };

    return (
        <div className="d-flex justify-content-center my-5">
            {filterProductCount > resPerPage && (
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={filterProductCount}
                onChange={setCurrentPageNo} 
                nextPageText={"Next"}
                prePageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
              
            )}
        </div>
    );
}

export default CustomPagination;
