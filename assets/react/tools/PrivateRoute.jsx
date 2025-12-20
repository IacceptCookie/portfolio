import {Redirect, useLocation} from "wouter";
import { useAuth } from "../providers/AuthProvider";
import {useEffect, useState} from "react";
import Loading from "../components/Loading/Loading";

function PrivateRoute({ children, role }) {
    const { hasRole, fetchUser } = useAuth();
    const [ready, setReady] = useState(false);
    const [location] = useLocation();

    useEffect(() => {
        fetchUser().then(() => setReady(true));
    }, [])

    if (ready) {
        return hasRole(role) ? children : <Redirect to={`/login${location ? `?redirect=${encodeURI(location)}` : ''}`} />;
    }
    return <Loading />;
}

export default PrivateRoute;