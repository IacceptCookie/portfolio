import React, {useEffect} from 'react';
import {useLocation} from "wouter";

const ExternalRedirect = ({ url }) => {
    const [, navigate] = useLocation();

    useEffect(() => {
        window.open(url, '_blank');
        navigate('/');
    }, [url, navigate]);

    return null;
};

export default ExternalRedirect;