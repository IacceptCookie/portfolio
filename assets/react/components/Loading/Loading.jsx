import "./Loading.css";

function Loading() {
    return (
        <div className="loading">
            <div className="loading-animation"></div>
            <p className="loading-message">
                Chargement...
            </p>
        </div>
    )
}

export default Loading;