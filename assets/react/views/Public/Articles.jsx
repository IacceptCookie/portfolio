import React, {useEffect, useState} from "react";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import backgroundVideo from "../../../video/back.webm";
import {searchArticles} from "../../services/api/Articles";
import SearchBar from "../../components/Search/SearchBar";
import ResultList from "../../components/Search/Result/ResultList";
import {renameKeys} from "../../tools/remaper";
import PaginationBar from "../../components/Search/Pagination/PaginationBar";

const defaultPagination = {
    current_page: undefined,
    total_pages: undefined,
    total_items: 0,
    items_per_page: undefined
}

const mapping = { tagLabel: "title", tagColor: "colorCode" };

function Articles() {
    const [searchText, updateSearchText] = useState("");
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState(defaultPagination);

    const handleArticlesSearch = async () => {
        const data = await searchArticles(searchText, true, tags.map(tag => tag.id), categories.map(category => category.id), pagination.current_page);
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
            <Stack aspectRatio="16/9" width="100%" maxHeight="60vh">
                <Layer
                    type="video"
                    src={backgroundVideo}
                    zIndex={1}
                />
                <Layer
                    type="linearGradient"
                    linearGradient="linear-gradient(360deg, rgba(8,9,87,1) 0%, rgba(255,255,255,0) 70%)"
                    zIndex={2}
                />
            </Stack>
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
                                    to: `article/${article.slug}`,
                                },
                                orientation: index % 2 === 0 ? "right" : "left"
                            }
                        }
                    ))
                }
            />
        </>
    );
}

export default Articles;