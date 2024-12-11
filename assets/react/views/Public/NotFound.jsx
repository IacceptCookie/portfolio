import React from "react";
import "./NotFound.css";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import NotFoundIllustration from "../../../img/404.png";
import {Link} from "wouter";

function NotFound() {
    return (
        <>
            <div className="top-filler"/>
            <div className="notfound-wrapper">
                <Stack aspectRatio="946/477" width="100%" className="notfound-illustration">
                    <Layer
                        type="image"
                        src={NotFoundIllustration}
                        alt="Error 404"
                        zIndex={1}
                    />
                </Stack>
                <h1 className="notfound-title">On dirait que la page que vous cherchez n'a pas été trouvé...</h1>
                <Link to="/" className="notfound-homelink">Revenir sur la page d'accueil</Link>
            </div>
        </>
    );
}

export default NotFound;
