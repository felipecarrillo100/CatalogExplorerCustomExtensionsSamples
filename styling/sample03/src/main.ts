import {Catex} from "./interfaces/Catex";
import {openBioForm} from "./modules/bioForm";
import {openChartsForm} from "./componets/SampleChartsForm";
import {openCreateCircleForm} from "./componets/CreateCircleForm";
import {openCreateCircleWidgetForm} from "./componets/CreateCircleWidgetForm";
import {openReactWindow} from "./componets/SampleReactWindow";
import {openListFeatureWindow} from "./componets/ListFearturesWindow";
import {openWorkspace} from "./modules/workspaceopen";
import {localDatasetsUSA} from "./modules/loadDatasets";

// This import will encode the image to Base4 using the library 'url-loader', look at the webpack.config.js
import logo from "./resources/images/new_logo.png";
import {colorsForm} from "./modules/colorsForm";

export function setCatex(catex: Catex) {
    window.catex = catex;
}

setCatex({
    app: {
        onAppReady: ()=> {
            const logoElement = document.querySelector("img.navbar-brandIcon");
            if (logoElement && logoElement instanceof HTMLImageElement) {
                logoElement.src = logo
            }
            const primaryColor = localStorage.getItem("app-primary-color");
            if (primaryColor) {
                const root = document.documentElement;
                root.style.setProperty('--color-primary', primaryColor);
            }
        },
        webservicesLabel: "My company data",
        webservices: [
            {
                id: "cs1-id",
                label: "American datasets",
                title: "A custom service that provides a list of assets",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        const results = localDatasetsUSA(o);
                        callback(results);
                    }
                }
            },        ],
        navbarActionsLabel: "AMAZING-APP",
        navbarActions: [
            {
                label: "Colors",
                title: "Just a sample of JSON Schema",
                id: "id-action-colors",
                action: (o, callback) => {
                    colorsForm()
                }
            },
            {
                label: "My workspaces",
                title: "Just a sample of JSON Schema",
                id: "id-form-action2",
                children:[
                    {
                        label: "Workspace 1",
                        title: "Just a sample of JSON Schema",
                        id: "id-sub0-ws1",
                        action: (o, callback) => {
                            openWorkspace()
                        }
                    },
                ]
            },
            {
                label: "Forms With JSOn Schema",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub1",
                children:[
                    {
                        label: "Open Bio",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-1",
                        action: (o, callback) => {
                            openBioForm()
                        }
                    },
                ]
            },
            {
                label: "Forms With React",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub2",
                children:[
                    {
                        label: "Sample form with charts",
                        title: "Just a sample form with React",
                        id: "id-form-2",
                        action: (o, callback) => {
                            openChartsForm()
                        }
                    },
                    {
                        label: "Create circle",
                        title: "Just a sample form with React",
                        id: "id-form-3",
                        action: (o, callback) => {
                            openCreateCircleForm()
                        }
                    },
                    {
                        label: "Create circle with widget",
                        title: "Just a sample form with React",
                        id: "id-form-4",
                        action: (o, callback) => {
                            openCreateCircleWidgetForm()
                        }
                    },
                ]
            },
            {
                label: "Windows With React",
                title: "Just a sample of Window With REact",
                id: "id-form-sub3",
                children:[
                    {
                        label: "Sample Window with React",
                        title: "Just a sample form with React",
                        id: "id-window-1",
                        action: (o, callback) => {
                            openReactWindow()
                        }
                    },
                    {
                        label: "List features",
                        title: "List features from a WFS or other vectors layers",
                        id: "id-window-2",
                        action: (o, callback) => {
                            openListFeatureWindow()
                        }
                    },
                ]
            },

        ]
    }
});
