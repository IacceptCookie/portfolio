import { React, useState } from "react";
import "./Article.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import SearchBar from "../../../components/Search/SearchBar";
import ResultList from "../../../components/Search/Result/ResultList";

function Manage() {
    const [searchText, updateSearchText] = useState("");

    return (
        <>
            <EditorHeader warning={false} />
            <SearchBar
                inputName="search"
                updateTextState={updateSearchText}
                value={searchText}
                placeholder="Recherchez des articles"
            />
            <ResultList
                className="result-list-article"
                results={
                    [
                        {
                            type: 'editorArticle',
                            content: {
                                title: 'Mon article intéressant',
                                readingTime: 5,
                            }
                        },
                        {
                            type: 'editorArticle',
                            content: {
                                title: 'Le jeu',
                                readingTime: 10,
                            }
                        },
                        {
                            type: 'editorArticle',
                            content: {
                                title: 'Dystopie cynique',
                                readingTime: 55,
                            }
                        },
                        {
                            type: 'editorArticle',
                            content: {
                                title: 'Mon article vide',
                                readingTime: 1,
                            }
                        },
                    ]
                }
            />
        </>
    );
}

export default Manage;