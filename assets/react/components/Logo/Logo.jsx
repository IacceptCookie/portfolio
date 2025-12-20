import React, {useState} from "react";
import "./Logo.css";

function Logo(
    {
        src,
        children
    }
) {
    const [folded, setFolded] = useState(true);

    return (
        <div
            className={`logo ${folded ? "folded" : "unfolded"}`}
            onClick={() => setFolded(!folded)}
        >
            <div className="logo-image">
                <img src={src} alt={children} />
            </div>
            <p className="logo-text">
                <span>{children}</span>
            </p>
        </div>
    );
}

export default Logo;