import { Catex } from "./interfaces/Catex";
import "./styles/index.scss"
import ReactDOM from "react-dom/client";
import React from "react";
import {App} from "./componets/App";
import "./main"

const renderApp = async () => {
    // tslint:disable-next-line:no-console
    console.log("Source code has loaded!");
    // tslint:disable-next-line:no-console
    console.log("Application is mounting...");
    const root = ReactDOM.createRoot(document.getElementById("document-companion"));
    root.render(<App/>);
};

renderApp();

