import React from "react";
import {Link} from "wouter";

function FooterSection({ title, linksData }) {
    return (
        <section className="footer__section">
            <p className="footer__section-title">{title}</p>
            <ul className="footer__section-links">
                {linksData.map((linkData, index) => (
                    <li key={index} className="footer__section-link-item">
                        <Link
                            className="footer__section-link"
                            to={linkData.href}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {linkData.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default FooterSection;