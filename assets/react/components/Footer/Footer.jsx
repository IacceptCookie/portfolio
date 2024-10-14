import React from "react";
import FooterSection from "./FooterSection";
import {Link} from "wouter";

function Footer() {
    return (
        <footer className="footer">
            <FooterSection
                title={"Lien"}
                linksData={
                    [
                        {
                            label: 'lien 01',
                            href: '/a',
                        },
                        {
                            label: 'lien 02',
                            href: '/b',
                        }
                    ]
                }
            />
            <FooterSection
                title={"Lien"}
                linksData={
                    [
                        {
                            label: 'lien 01',
                            href: '/a',
                        },
                        {
                            label: 'lien 02',
                            href: '/b',
                        }
                    ]
                }
            />
            <FooterSection
                title={"Lien"}
                linksData={
                    [
                        {
                            label: 'lien 01',
                            href: '/a',
                        },
                        {
                            label: 'lien 02',
                            href: '/b',
                        }
                    ]
                }
            />
            <Link to={'/'} className={"footer__homelink"}>www.raphael-durand.fr</Link>
        </footer>
    );
}

export default Footer;