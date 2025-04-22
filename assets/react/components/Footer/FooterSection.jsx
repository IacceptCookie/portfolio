import React from "react";
import {Link} from "wouter";
import {useAuth} from "../../providers/AuthProvider";

function FooterSection({ title, linksData }) {
    const { hasRole } = useAuth();
    return (
        <section className="footer__section">
            <p className="footer__section-title">{title}</p>
            <ul className="footer__section-links">
                {linksData
                    .filter(linkData => (!linkData.role || hasRole(linkData.role)) && !linkData.outer)
                    .map((linkData, index) => (
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
                    ))
                }
                {linksData
                    .filter(linkData => (!linkData.role || hasRole(linkData.role)) && linkData.outer)
                    .map((linkData, index) => (
                        <li key={index} className="footer__section-link-item">
                            <button
                                className="footer__section-link outer-button"
                                onClick={() => window.location.href = linkData.href}
                                rel="noopener noreferrer"
                            >
                                {linkData.label}
                            </button>
                        </li>
                    ))
                }
            </ul>
        </section>
    );
}

export default FooterSection;