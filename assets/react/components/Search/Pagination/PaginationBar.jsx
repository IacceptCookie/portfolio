import React from "react";
import "./Pagination.css";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function PaginationBar(
    {
        pagination,
        setPagination,
    }
)
{
    const goToPage = (page) => {
        setPagination({
            ...pagination,
            current_page: page
        });
    };

    if (pagination.total_items === 0) {
        return (
            <p className='pagination-bar-no-result'>Aucun article trouvé</p>
        )
    }
    return (
        <div className="pagination-bar">
            {pagination.current_page !== undefined && pagination.current_page > 1 && (
                <button className="pagination-bar__first" onClick={() => goToPage(1)}>
                    1
                </button>
            )}

            {pagination.current_page !== undefined && pagination.current_page > 1 && (
                <button className="pagination-bar__previous" onClick={() => goToPage(pagination.current_page - 1)}>
                    <FontAwesomeIcon icon={faChevronLeft} className="pagination-bar-chevron" />
                </button>
            )}

            <button className="pagination-bar__current">
                {pagination.current_page}
            </button>

            {pagination.current_page !== undefined && pagination.total_pages !== undefined && pagination.current_page < pagination.total_pages && (
                <button className="pagination-bar__next" onClick={() => goToPage(pagination.current_page + 1)}>
                    <FontAwesomeIcon icon={faChevronRight} className="pagination-bar-chevron" />
                </button>
            )}

            {pagination.current_page !== undefined && pagination.total_pages !== undefined && pagination.current_page < pagination.total_pages && (
                <button className="pagination-bar__last" onClick={() => goToPage(pagination.total_pages)}>
                    {pagination.total_pages}
                </button>
            )}
        </div>
    );
}

export default PaginationBar;