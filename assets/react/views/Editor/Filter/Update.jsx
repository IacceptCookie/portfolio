import React, {useEffect, useState} from "react";
import "./Filter.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import FilterEditor from "../../../components/Editor/FilterEditor/FilterEditor";
import PaginationBar from "../../../components/Search/Pagination/PaginationBar";
import ResultList from "../../../components/Search/Result/ResultList";
import {searchArticles} from "../../../services/api/Articles";
import {renameKeys} from "../../../tools/remaper";

const defaultPagination = {
    current_page: undefined,
    total_pages: undefined,
    total_items: undefined,
    items_per_page: undefined
}

const mapping = { tagLabel: "title", tagColor: "colorCode" };

function Update(
    {
        filter
    }
) {
    const [pagination, setPagination] = useState(defaultPagination);
    const [articles, setArticles] = useState([]);

    const handleArticlesSearch = async () => {
        const tags = filter.type === "tag" ? [filter.id] : [];
        const categories = filter.type === "category" ? [filter.id] : [];
        const data = await searchArticles("", false, tags, categories, pagination.current_page);
        setArticles(data.items);
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
        handleArticlesSearch();
    }, [pagination]);

    return (
        <>
            <EditorHeader warning={true} />
            <FilterEditor updateFilter={filter} />
            <div className="filter-usage-wrapper">
                <h2 className="filter-usage-title">
                    Utilisations du filtre
                </h2>
                <PaginationBar
                    pagination={pagination}
                    setPagination={setPagination}
                />
                <ResultList
                    className="filter-usage-list"
                    results={
                        articles.map((article, index) => (
                            {
                                type: 'article',
                                content: {
                                    cardData: {
                                        title: article.articleTitle,
                                        readingTime: article.readingTime,
                                        image: article.illustration.imagePath,
                                        description: article.articleDescription,
                                        tags: article.tags.map(tag => renameKeys(tag, mapping)),
                                        to: `/article/${article.slug}`,
                                    },
                                    orientation: index % 2 === 0 ? "right" : "left"
                                }
                            }
                        ))
                    }
                />
            </div>
        </>
    );
}

export default Update;