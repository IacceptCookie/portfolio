import React, { useState, useEffect } from "react";
import TitleUpdater from "../tools/TitleUpdater";
import NotFound from "../views/Public/NotFound";
import { useParams } from "wouter";
import Update from "../views/Editor/Filter/Update";
import {getFilterByIdAndType} from "../services/api/Filters";
import Loading from "../components/Loading/Loading";

function UpdateFilterRoute() {
    const { type, id } = useParams();
    console.log("params", type, id);
    const [filter, setFilter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFilter() {
            setLoading(true);
            try {
                const response = await getFilterByIdAndType(id, type);
                setFilter(response);
            } catch (err) {
                setFilter(null);
            } finally {
                setLoading(false);
            }
        }
        fetchFilter();
    }, [type, id]);

    if (loading) {
        return <Loading />;
    }

    if (!filter) {
        return (
            <>
                <TitleUpdater title="404: Not Found" />
                <NotFound />
            </>
        );
    }

    let formattedFilter = undefined;

    if (type === "tag") {
        formattedFilter = {
            id: filter.id,
            label: filter.tagLabel,
            type: "tag",
            color: filter.tagColor
        };
    } else {
        formattedFilter = {
            id: filter.id,
            label: filter.categoryLabel,
            type: "category"
        }
    }

    return (
        <>
            <TitleUpdater title={`Modification ${formattedFilter.label}`} />
            <Update filter={formattedFilter} />
        </>
    );
}

export default UpdateFilterRoute;