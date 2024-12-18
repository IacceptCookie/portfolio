import React from "react";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import "./Contact.css";
import backgroundVideo from "../../../video/back.webm";
import AnimatedText from "../../components/AnimatedText";
import {Link} from "wouter";

function Contact() {
    return (
        <div className="contact-view">
            <Stack aspectRatio="16/9" width="100%" maxHeight="60vh">
                <Layer
                    type="video"
                    src={backgroundVideo}
                    zIndex={1}
                />
                <Layer
                    type="linearGradient"
                    linearGradient="linear-gradient(360deg, rgba(8,9,87,1) 0%, rgba(255,255,255,0) 70%)"
                    zIndex={2}
                />
            </Stack>
            <div className="contact-container">
                <form className="contact-form">
                    <h1>Me contacter</h1>
                    <div className="input-group">
                        <input type="text" name="firstname" placeholder="Prénom" id="firstname" required={true} />
                        <input type="text" name="lastname" placeholder="Nom" id="lastname" required={true} />
                    </div>
                    <input type="text" name="email" placeholder="Adresse email" id="email" required={true} />
                    <select name="subject" id="subject-selector" required={true}>
                        <option value="default" selected={true}>- Choisissez un objet -</option>
                        <option value="support">Support/Juridique</option>
                        <option value="professionnal">Professionnel</option>
                        <option value="other">Autre</option>
                    </select>
                    <textarea rows={8} name="message" id="message" placeholder="Message"/>
                    <label id="cgu-consent">
                        <input type="checkbox" name="cgu-consent" id="cgu-consent__checkbox" required={true}/>
                        <p id="cgu-consent__label">
                            J'ai pris connaissance et j'accepte les <Link to="/cgu" id="cgu-link">conditions générales d'utilisation</Link>
                        </p>
                    </label>
                    <input type="submit" value="Envoyer" id="submit"/>
                </form>
                <AnimatedText
                    className="disclaimer-text"
                    text="Messages à caractère professionel uniquement. Tout message inapproprié ne sera pas traité. En complétant ce formulaire, vous consentez à communiquer les informations demandées. Ces dernières ne sont pas collectées dans un but commercial."
                    speed={10}
                />
            </div>
        </div>
    );
}

export default Contact;