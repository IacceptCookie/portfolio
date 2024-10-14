import React from "react";
import Routes from "../routes";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

function App() {
    return (
        <div className="app">
            <Header />
            <main>
                <Routes />
            </main>
            <Footer />
        </div>
    );
}

export default App;
