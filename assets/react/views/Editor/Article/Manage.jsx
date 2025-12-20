import {React, useEffect, useState} from "react";
import "./Article.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import SearchBar from "../../../components/Search/SearchBar";
import ResultList from "../../../components/Search/Result/ResultList";
import {searchArticles} from "../../../services/api/Articles";
import PaginationBar from "../../../components/Search/Pagination/PaginationBar";

const defaultPagination = {
    current_page: undefined,
    total_pages: undefined,
    total_items: 0,
    items_per_page: undefined
}

function Manage() {
    const [searchText, updateSearchText] = useState("");
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState(defaultPagination);

    const handleArticlesSearch = async () => {
        const data = await searchArticles(searchText, false, tags.map(tag => tag.id), categories.map(category => category.id), pagination.current_page);
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
    }, [searchText, tags, categories, pagination]);

    return (
        <>
            <EditorHeader warning={false} />
            <SearchBar
                inputName="search"
                updateTextState={updateSearchText}
                value={searchText}
                placeholder="Recherchez des articles"
                type="filter"
                selectedTags={tags}
                updateSelectedTags={setTags}
                selectedCategories={categories}
                updateSelectedCategories={setCategories}
                resultNumber={pagination.total_items}
            />
            <PaginationBar
                pagination={pagination}
                setPagination={setPagination}
            />
            <ResultList
                className="result-list-article"
                results={
                    articles.map((article) => (
                        {
                            type: 'editorArticle',
                            content: {
                                title: article.articleTitle,
                                readingTime: article.readingTime,
                                slug: `/article/update/${article.slug}`,
                            }
                        }
                    ))
                }
            />
        </>
    );
}

export default Manage;