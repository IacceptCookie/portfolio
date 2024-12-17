import { React, useState } from "react";
import "./Filter.css";
import EditorHeader from "../../../components/Editor/EditorHeader";
import SearchBar from "../../../components/Search/SearchBar";
import ResultList from "../../../components/Search/Result/ResultList";
import {Link} from "wouter";

function Manage() {
    const [searchText, updateSearchText] = useState("");

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
            <ResultList
                className="result-list-filter"
                results={
                    [
                        {
                            type: 'editorTag',
                            content: {
                                color: '3b86ec',
                                label: 'PHP'
                            }
                        },
                        {
                            type: 'editorTag',
                            content: {
                                color: '7930fa',
                                label: 'Violet',
                                useCount: 1
                            }
                        },
                        {
                            type: 'editorTag',
                            content: {
                                color: 'dffa30',
                                label: 'Twig',
                                useCount: 12
                            }
                        },
                        {
                            type: 'editorTag',
                            content: {
                                color: 'ff8802',
                                label: 'Grafana',
                                useCount: 0
                            }
                        },
                        {
                            type: 'editorCategory',
                            content: {
                                label: 'Projet',
                                useCount: 923
                            }
                        },
                        {
                            type: 'editorCategory',
                            content: {
                                label: 'Article',
                                useCount: 5
                            }
                        }
                    ]
                }
            />
        </>
    );
}

export default Manage;