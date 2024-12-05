import React, { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import Logo from "../../../img/logo-complete.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "./Header.css";

function Header() {
    const [folded, setFoldedState] = useState(true);
    const [blurred, setBlurredState] = useState(false);
    const navRef = useRef(null);

    useEffect(() => {
        const navElement = navRef.current;

        if (!folded) {
            navElement.style.maxHeight = `${navElement.scrollHeight}px`;
        } else {
            navElement.style.maxHeight = '0';
        }
    }, [folded]);

    return (
        <header className={`header ${blurred ? "blurred" : "unblurred"}`}>
            <nav className="header__large">
                <section className="header__left">
                    <Link to="/">
                        <img src={String(Logo)} alt="Accueil" className="header__logo" />
                    </Link>
                </section>
                <section className="header__center">
                    <Link to="/profile" className="header__link rollon">Profil</Link>
                    <Link to="/articles" className="header__link rollon">Articles</Link>
                    <Link to="/login" className="header__link rollon">Connexion</Link>
                </section>
                <section className="header__right">
                    <Link to="/contact" className="header__link highlight">Contact</Link>
                </section>
            </nav>
            <div className="header__small-area">
                <div className="header__small">
                    <Link to="/">
                        <img src={String(Logo)} alt="Accueil" className="header__logo-small" />
                    </Link>
                    <button
                        onClick={
                        () => {
                            setFoldedState(!folded);
                            setBlurredState(!blurred);
                        }
                    }
                        aria-label="Toggle navigation"
                        className="header__toggle-btn"
                    >
                        <FontAwesomeIcon icon={faBars} className="header__toggle-icon" />
                    </button>
                </div>
                <nav ref={navRef} className={`header__nav ${folded ? "folded" : "unfolded"}`}>
                    <Link to="/profile" className="header__link-small rollon">Profil</Link>
                    <Link to="/articles" className="header__link-small rollon">Articles</Link>
                    <Link to="/login" className="header__link-small rollon">Connexion</Link>
                    <Link to="/contact" className="header__link-small rollon">Contact</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;