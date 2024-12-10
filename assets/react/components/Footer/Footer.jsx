import React from "react";
import FooterSection from "./FooterSection";
import {Link} from "wouter";
import FooterImage from "./FooterImage";
import Logo from "../../../img/logo-complete.png";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className={"footer__content"}>
                <FooterImage src={String(Logo)} alt={"Logo"} to='/' />
                <FooterSection
                    title={"Réseaux"}
                    linksData={
                        [
                            {
                                label: 'LinkedIn',
                                href: '/linkedin',
                            },
                            {
                                label: 'Github',
                                href: '/github',
                            }
                        ]
                    }
                />
                <FooterSection
                    title={"A propos"}
                    linksData={
                        [
                            {
                                label: 'Mentions légales',
                                href: '/cgu',
                            },
                            {
                                label: 'Besoin d\'aide ?',
                                href: '/help',
                            }
                        ]
                    }
                />
            </div>
            <Link to={'/'} className={"footer__homelink"}>www.raphael-durand.fr</Link>
        </footer>
    );
}

export default Footer;