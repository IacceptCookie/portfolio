import React from "react";
import "./Help.css";
import EditorHeader from "../../components/Editor/EditorHeader/EditorHeader";
import Accordion from "../../components/Accordion/Accordion";
import {Link} from "wouter";
import AnimatedText from "../../components/Text/AnimatedText";

function Help() {
    return (
        <>
            <EditorHeader warning={false} />
            <div className="faq">
                <Accordion
                    title="Où puis-je télécharger ton curriculum vitæ (CV) ?"
                >
                    <p className="help-paragraph">Mon curriculum vitæ est disponible sur la page <Link to="/profile">Profil</Link>.</p>
                </Accordion>
                <Accordion
                    title="Je souhaite collaborer ou travailler avec toi sur un projet ou un événement."
                >
                    <p className="help-paragraph">Je suis toujours ouvert aux propositions de collaboration. Merci de m’adresser votre demande via le formulaire de contact avec l’objet <strong>« Collaboration »</strong>.</p>
                </Accordion>
                <Accordion
                    title="J’ai des difficultés à naviguer ou à utiliser ton portfolio."
                >
                    <p className="help-paragraph">Merci de m’adresser votre problème via le formulaire de contact avec l’objet <strong>« Support »</strong>. Si ce dernier ne fonctionne pas, envoyez-moi un e-mail à l’adresse : <strong>contact@raphael-durand.fr</strong> (à utiliser en dernier recours, je verrai votre message plus rapidement via le formulaire). Merci de fournir une capture d’écran si possible ainsi qu’une explication sur la manière de reproduire le problème.</p>
                </Accordion>
                <Accordion
                    title="Je souhaite m'inspirer ou reprendre certains éléments présents sur ton site internet pour mes projets personnels."
                >
                    <p className="help-paragraph">Le code source de mon site internet est disponible sur ma page <Link to="/github">GitHub</Link> en open source. Certains éléments ont été repris dans d'autres projets open source et crédités dans le code source (merci de conserver le crédit de ces éléments). Le contenu publié sur mon site est cependant protégé par la propriété intellectuelle et distribué à titre <strong>informatif uniquement</strong>.</p>
                </Accordion>
                <Accordion
                    title="Je souhaite réutiliser du contenu présent sur ton site."
                >
                    <p className="help-paragraph">Le contenu que je publie sur mon portfolio est distribué à titre <strong>informatif uniquement</strong> et relève de la propriété intellectuelle. Si vous souhaitez néanmoins réutiliser ce contenu, merci de me contacter pour obtenir une autorisation. Une partie du contenu provient d'autres sources ; ce contenu dépend donc de la propriété intellectuelle de leurs auteurs respectifs.</p>
                </Accordion>
                <Accordion
                    title="J’ai une réclamation à faire concernant du contenu publié sur ton portfolio."
                >
                    <p className="help-paragraph">Merci de m’adresser votre réclamation via le formulaire de contact avec l’objet <strong>« Support »</strong>.</p>
                </Accordion>
                <Accordion
                    title="Que deviennent mes données après avoir utilisé le formulaire de contact ?"
                >
                    <p className="help-paragraph">Les données demandées dans le formulaire de contact me permettent de répondre à votre message. Elles ne sont conservées que jusqu’à ce que le message soit traité. <strong>En aucun cas</strong> vos données ne sont revendues ni utilisées à des fins commerciales.</p>
                </Accordion>
                <Accordion
                    title="Ce site utilise-t-il des cookies ?"
                >
                    <p className="help-paragraph">Ce site peut utiliser des cookies afin de conserver vos préférences (langue, consentement vis-à-vis des cookies ou traceurs, fonctionnalités nécessitant une persistance des informations). <strong>En aucun cas</strong> je n’utilise de cookies ou d’autres traceurs à des fins commerciales ou publicitaires.</p>
                </Accordion>
                <AnimatedText
                    className="help-text"
                    text="Si cette page n'a pas répondu à votre question, merci de me l'adresser via le formulaire de contact avec l'objet « Autre »."
                    speed={10}
                />
            </div>
        </>
    );
}

export default Help;