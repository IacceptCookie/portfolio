import React from "react";
import Routes from "../routes";

function App() {
    return (
        <div className="app">
            <header>
                <p>header</p>
            </header>
            <main>
                <Routes />
            </main>
            <footer>
                <p>footer</p>
            </footer>
        </div>
    );
}

export default App;
