import {useEffect, useState} from "react";
import {Redirect} from "wouter";

function Logout() {
    const [ready, setReady] = useState(false);

    const handleLogout = async () => {
        await fetch('/authentication/logout', { method: 'POST', credentials: 'include' });
        sessionStorage.removeItem("csrf_token");
    };

    useEffect(() => {
        handleLogout().then(() => setReady(true));
    }, [])

    if (ready) {
        return <Redirect to='/' />;
    }
    return <p>Loading...</p>;
}

export default Logout;