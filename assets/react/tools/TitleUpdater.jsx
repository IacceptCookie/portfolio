import React, { useEffect } from 'react';
import { useLocation } from 'wouter';

const TitleUpdater = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);
    return null;
};

export default TitleUpdater;