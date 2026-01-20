import React from "react";
import "./CGU.css";
import EditorHeader from "../../components/Editor/EditorHeader/EditorHeader";
import {Link} from "wouter";

function CGU() {
    return (
        <>
            <EditorHeader warning={false} />
            <div className="terms-of-use">
                <h1>Conditions générales d'utilisation</h1>
                <h2>Date de dernière mise à jour : 20/01/2026</h2>
                <p>
                    Les présentes conditions générales d'utilisation sont conclues entre :<br />
                    <br />
                    - <strong>Monsieur Raphaël DURAND</strong>, propriétaire exclusif du présent site internet, ci-après « Moi » et « Nous ».<br />
                    <br />
                    D'une part,<br />
                    <br />
                    - <strong>Toute personne physique majeure capable, ou toute personne morale,</strong> ci-après l’« Utilisateur »,<br />
                    <br />
                    D'autre part,<br />
                </p>
                <h2>Article 1</h2>
                <h3>Généralités et consentement de l'utilisateur</h3>
                <p>
                    Les présentes CGU ou Conditions Générales d’Utilisation encadrent juridiquement
                    l’utilisation du site raphael-durand.fr (ci-après dénommé « le Site »).<br />
                    <br />
                    En utilisant le Site, l’Utilisateur reconnaît et confirme avoir lues, comprises et acceptées dans leur intégralité,
                    et sans réserve, l’ensemble des présents termes,
                    obligations et conditions d’utilisation, ci-après les « Conditions Générales ».<br />
                    <br />
                    Moi, Raphaël DURAND se réserve le droit de modifier les Conditions Générales, lesquelles prendront effet dès leur publication sur le Site.
                    L’Utilisateur est invité à prendre connaissance des Conditions Générales à chaque fois qu’il utilise le Site,
                    sans qu’il soit nécessaire de l’en prévenir formellement.<br />
                </p>
                <h2>Article 2</h2>
                <h3>Mentions légales</h3>
                <p>
                    L’édition du Site est assurée par Moi, Raphaël DURAND à titre exclusif.<br />
                    <br />
                    L’hébergeur du site raphael-durand.fr est la société Hostinger, sise au <strong>Jonavos g. 60C, 44192, Lituanie.</strong><br />
                </p>
                <h2>Article 3</h2>
                <h3>Accès au site</h3>
                <p>
                    Le Site est accessible gratuitement depuis n’importe où par tout utilisateur disposant d’un accès à Internet.
                    Tous les frais nécessaires pour l’accès aux services (matériel informatique, connexion Internet…) sont à la charge de l’utilisateur. <br />
                    <br />
                    Pour des raisons de maintenance ou autres, l’accès au site peut être interrompu ou suspendu par l’éditeur sans préavis ni justification.<br />
                </p>
                <h2>Article 4</h2>
                <h3>Collecte de données</h3>
                <p>
                    Le Site propose un formulaire de contact permettant de Nous écrire. Les informations demandées par le formulaire
                    ne sont conservées que jusqu'à ce que le message soit traité. En aucun cas, ces informations ne sont utilisées dans un autre but que celui
                    décrit dans cet article.<br />
                    <br />
                    L'Utilisateur consent en remplissant le formulaire de contact à communiquer les informations demandées et à être recontacté via
                    l'adresse électronique ainsi renseignée.<br />
                    <br />
                    Il est de la responsabilité de l'Utilisateur de ne pas communiquer d'informations que ce dernier désire garder pour lui.
                </p>
                <h2>Article 5</h2>
                <h3>Restriction d'utilisation et propriété intellectuelle</h3>
                <p>
                    Le Site propose un contenu utilisable à titre informatif uniquement.
                    Il est proscrit d'utiliser ce contenu sans autorisation, incluant entre autres le plagiat, la reproduction et la republication.<br />
                    <br />
                    L'Utilisateur peut cependant utiliser le contenu à titre personnel et non-commercial sans en altérer le contenu, incluant en autres le copyright.<br />
                    <br />
                    Le Site peut mettre en avant des logos et du contenu sous Copyright dont la propriété intellectuelle appartient à leurs auteurs respectifs.
                    Tout usage de la propriété intellectuelle sans autorisation préalable est strictement interdit.
                </p>
                <h2>Article 6</h2>
                <h3>Liens hypertextes menant vers des sites tiers</h3>
                <p>
                    Le Site peut proposer à l'Utilisateur des liens hypertextes menant vers des sites externes.
                    Par définition, donc, Nous ne contrôlons pas le contenu et les services que ces sites peuvent vous présenter.<br />
                    <br />
                    Les liens hypertextes ont pour seule vocation de mener l'Utilisateur vers du contenu externe susceptible de l'intéresser.
                    En aucun cas, nous ne pouvons être associés ou être tenus responsables du contenu présent sur les sites webs relatifs à ces liens.
                </p>
                <h2>Article 7</h2>
                <h3>Clause de responsabilité</h3>
                <p>
                    En aucun cas, Moi Raphaël DURAND et le Site, ne peuvent être associés ou tenus responsables de dommages et troubles causés par la mauvaise
                    interprétation ou utilisation par l'Utilisateur des informations présentes sur le Site.<br />
                    <br />
                    Il convient de la responsabilité de l'Utilisateur d'utiliser en adéquation les informations présentes sur le Site.
                </p>
                <h2>Article 8</h2>
                <h3>Cookies</h3>
                <p>
                    Le Site utilise des cookies pour conserver les choix de l'Utilisateur en termes de préférences.<br />
                    Ces cookies ne sont pas utilisés à des fins commerciales ou publicitaires mais uniquement pour améliorer l'expérience utilisateur.
                    L'Utilisateur pourra recevoir une demande de consentement en visitant le Site. Par ailleurs, si l'Utilisateur accepte les cookies, un cookie
                    conservant son consentement pendant 12 mois lui sera remis.
                </p>
                <h2>Article 9</h2>
                <h3>Contact</h3>
                <p>
                    Si l'Utilisateur souhaite faire remonter une remarque ou une question vis à vis des Conditions Générales,
                    il peut nous contacter avec cet <strong><Link className="contact-link" to="/contact">onglet</Link></strong>.
                </p>
            </div>
        </>
    );
}

export default CGU;