import React, {useState} from "react";

import "../styles/introbanner.scss";

//  The React App is currently doing nothing but you can extend it if required
export const App: React.FC = () => {
    const [className, setClassName] = useState("intro-banner")
    const closeWindow = (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        setClassName("intro-banner-hidden");
    }
    return (<>
        <div className={className}>
            <h1>My logo</h1>
            <form>
                <input type="text"/>
                <input type="password" />
                <button onClick={closeWindow}>Login</button>
            </form>
        </div>
    </>)
}
