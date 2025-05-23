import React from "react";
import {Link} from "wouter";

function FooterImage({ src, alt, to }) {
    return (
        <section className="footer__section image-section">
            <Link to={to}>
                <img src={src} alt={alt} className="footer__image"/>
            </Link>
        </section>
    );
}

export default FooterImage;