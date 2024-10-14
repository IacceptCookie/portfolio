import React from "react";
import Routes from "../routes";
import Footer from "./Footer/Footer";

function App() {
    return (
        <div className="app">
            <header>
                <p>header</p>
            </header>
            <main>
                <Routes />
            </main>
            <Footer />
        </div>
    );
}

export default App;
