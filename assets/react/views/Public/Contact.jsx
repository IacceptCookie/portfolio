import React, {useState} from "react";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import "./Contact.css";
import backgroundVideo from "../../../video/back.webm";
import AnimatedText from "../../components/Text/AnimatedText";
import {Link} from "wouter";

function Contact() {
    const [fileName, setFileName] = useState("");

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const fileInput = form.file;
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/webp'];
            const maxSize = 5 * 1024 * 1024;

            if (!allowedTypes.includes(file.type)) {
                alert('Type de fichier non autorisé. PDF, PNG, JPG ou WEBP seulement.');
                return;
            }

            if (file.size > maxSize) {
                alert('Le fichier ne doit pas dépasser 5 Mo.');
                return;
            }
        }

        const formData = new FormData();
        formData.append('firstname', form.firstname.value);
        formData.append('lastname', form.lastname.value);
        formData.append('email', form.email.value);
        formData.append('subject', form.subject.value);
        formData.append('message', form.message.value);

        if (fileInput.files.length > 0) {
            formData.append('file', fileInput.files[0]);
        }

        try {
            const response = await fetch('/email/contact', {
                method: 'POST',
                headers: {
                    "X-CSRF-TOKEN": sessionStorage.getItem("csrf_token"),
                },
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Message envoyé avec succès !');
                setFileName("");
                form.reset();
            } else {
                alert('Erreur : ' + result.error);
            }
        } catch (error) {
            alert('Erreur lors de l\'envoi : ' + error.message);
        }
    };

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
                <form className="contact-form" onSubmit={handleSubmit}>
                    <h1>Me contacter</h1>
                    <div className="input-group">
                        <input type="text" name="firstname" placeholder="Prénom" id="firstname" required={true} />
                        <input type="text" name="lastname" placeholder="Nom" id="lastname" required={true} />
                    </div>
                    <input type="text" name="email" placeholder="Adresse email" id="email" required={true} />
                    <select defaultValue="default" name="subject" id="subject" required={true}>
                        <option value="default">- Choisissez un objet -</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Support">Support</option>
                        <option value="Other">Autre</option>
                    </select>
                    <textarea rows={8} name="message" id="message" placeholder="Message"/>
                    <label htmlFor="file" id="file-label">{fileName ? fileName : 'Joindre un fichier (PDF, PNG, JPG, WEBP, max 5 Mo)'}</label>
                    <input type="file" name="file" id="file" accept=".pdf,.png,.jpg,.jpeg,.webp" onChange={handleFileChange} />
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