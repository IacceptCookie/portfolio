import { useEffect } from 'react';
import { useLocation } from 'wouter';

function ScrollToTop() {
    const [location] = useLocation()

    useEffect(() => {
        if (location.includes('#')) return
        window.scrollTo(0, 0)
    }, [location])

    return null
}

export default ScrollToTop;