import React, { useEffect, useState } from "react";
import "./Filter.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import SearchBar from "../../../components/Search/SearchBar";
import ResultList from "../../../components/Search/Result/ResultList";
import {Link} from "wouter";
import PaginationBar from "../../../components/Search/Pagination/PaginationBar";
import {searchFilters} from "../../../services/api/Filters";

const defaultPagination = {
    current_page: undefined,
    total_pages: undefined,
    total_items: undefined,
    items_per_page: undefined
}

function Manage() {
    const [searchText, updateSearchText] = useState("");
    const [pagination, setPagination] = useState(defaultPagination);
    const [filters, setFilters] = useState([]);

    const handleFiltersSearch = async () => {
        const data = await searchFilters(searchText, pagination.current_page);
        setFilters(data.items);
        if (
            data.current_page !== pagination.current_page
            || data.total_pages !== pagination.total_pages
            || data.total_items !== pagination.total_items
            || data.items_per_page !== pagination.items_per_page
        ) {
            setPagination(
                {
                    current_page: data.current_page,
                    total_pages: data.total_pages,
                    total_items: data.total_items,
                    items_per_page: data.items_per_page
                }
            );
        }
    };

    useEffect(() => {
        handleFiltersSearch();
    }, [searchText, pagination]);

    return (
        <>
            <EditorHeader warning={false} />
            <Link to="/filter/create" className="create-filter-button">Créer un filtre</Link>
            <SearchBar
                inputName="search"
                updateTextState={updateSearchText}
                value={searchText}
                placeholder="Recherchez des filtres"
            />
            <PaginationBar
                pagination={pagination}
                setPagination={setPagination}
            />
            <ResultList
                className="result-list-filter"
                results={
                    filters.map((filter) => (
                        {
                            type: `editor${String(filter.type).charAt(0).toUpperCase() + String(filter.type).slice(1)}`,
                            content: {
                                id: filter.id,
                                label: filter.label,
                                color: filter.color,
                                useCount: filter.useCount,
                            }
                        }
                    ))
                }
            />
        </>
    );
}

export default Manage;