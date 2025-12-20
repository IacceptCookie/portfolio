import React, {useEffect} from "react";
import Routes from "../routes";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import "./App.css";
import "./font.css";
import {useAuth} from "../providers/AuthProvider";
import ScrollToTop from "../tools/ScrollToTop";

function App() {
    const { fetchUser } = useAuth();

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <div className="app">
            <Header />
            <main>
                <ScrollToTop />
                <Routes />
            </main>
            <Footer />
        </div>
    );
}

export default App;
