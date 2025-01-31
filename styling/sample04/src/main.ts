import {Catex} from "./interfaces/Catex";
import {openBioForm} from "./modules/bioForm";
import {openChartsForm} from "./componets/SampleChartsForm";
import {openCreateCircleForm} from "./componets/CreateCircleForm";
import {openCreateCircleWidgetForm} from "./componets/CreateCircleWidgetForm";
import {openReactWindow} from "./componets/SampleReactWindow";
import {openListFeatureWindow} from "./componets/ListFearturesWindow";
import {openWorkspace} from "./modules/workspaceopen";
import {localDatasetsUSA} from "./modules/loadDatasets";
import {LanguageSettings} from "./modules/languageSettings";

// This import will encode the image to Base4 using the library 'url-loader', look at the webpack.config.js
import logo from "./resources/images/new_logo.png";
import {colorsForm} from "./modules/colorsForm";

export function wireCatex(catex: Catex) {
    window.catex = catex;
}


// Function used to Reevaluate language settings on language change


function recalculateCatex(): Catex {
    return {
        app: {
            language: {
                onChange: (o) => {
                    LanguageSettings.setLanguage(o.la);
                    if (window.catex.rewire) {
                        const newCatex = recalculateCatex();
                        window.catex.rewire(newCatex);
                    }
                }
            },
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
                window.catex.app.language.getList().then(list=>{
                    console.log(list);
                    window.catex.app.language.filter = (language) => ["en", "es"].includes(language.value);
                })
            },
            webservicesLabel: LanguageSettings.textByID({id:"main.webservicesLabel"}),
            webservices: [
                {
                    id: "cs1-id",
                    label: LanguageSettings.textByID({id:"main.webservices.cs1", defaultText: "{country} datasets, {state}", values: {country:"America", "state": "New York"}}),
                    title: "A custom service that provides a list of assets",
                    action: function(o, callback) {
                        if (typeof callback === "function") {
                            const results = localDatasetsUSA(o);
                            callback(results);
                        }
                    }
                },
            ],
            navbarActionsLabel: LanguageSettings.textByID({id:"main.navbarActionsLabel"}).toUpperCase(),
            navbarActions: [
                {
                    label: LanguageSettings.textByID({id:"main.navbarActionsLabel.Colors"}),
                    title: LanguageSettings.textByID({id:"main.navbarActionsLabel.Colors.title"}),
                    id: "id-action-colors",
                    action: (o, callback) => {
                        colorsForm()
                    }
                },
                {
                    label: LanguageSettings.textByID({id:"main.navbarActionsLabel.MyWorkspaces"}),
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
                    label: LanguageSettings.textByID({id:"main.navbarActionsLabel.MyJSONSchemaForms"}),
                    title: "Just a sample of JSON Schema",
                    id: "id-form-sub1",
                    children:[
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.OpenBio"}),
                            title: "Just a sample of JSON Schema",
                            id: "id-form-1",
                            action: (o, callback) => {
                                openBioForm()
                            }
                        },
                    ]
                },
                {
                    label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactForms"}),
                    title: "",
                    id: "id-form-sub2",
                    children:[
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactForms.SampleCharts"}),
                            title: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactForms.SampleCharts.title"}),
                            id: "id-form-2",
                            action: (o, callback) => {
                                openChartsForm()
                            }
                        },
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactForms.CreateCircle"}),
                            title: "Just a sample form with React",
                            id: "id-form-3",
                            action: (o, callback) => {
                                openCreateCircleForm()
                            }
                        },
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactForms.CreateCircleWidget"}),
                            title: "Just a sample form with React",
                            id: "id-form-4",
                            action: (o, callback) => {
                                openCreateCircleWidgetForm()
                            }
                        },
                    ]
                },
                {
                    label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactWindows"}),
                    title: "Just a sample of Window With REact",
                    id: "id-form-sub3",
                    children:[
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactWindows.SampleWindow"}),
                            title: "Just a sample form with React",
                            id: "id-window-1",
                            action: (o, callback) => {
                                openReactWindow()
                            }
                        },
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.ReactWindows.ListFeatures"}),
                            title: "List features from a WFS or other vectors layers",
                            id: "id-window-2",
                            action: (o, callback) => {
                                openListFeatureWindow()
                            }
                        },
                    ]
                },
                {
                    label: LanguageSettings.textByID({id:"main.navbarActionsLabel.Languages"}),
                    title: "Change lanaguages",
                    id: "id-form-sub4",
                    children:[
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.Languages.English"}),
                            title: "Set English",
                            id: "id-window4-1",
                            action: (o, callback) => {
                                window.catex.app.language.setLanguage("en");
                            }
                        },
                        {
                            label: LanguageSettings.textByID({id:"main.navbarActionsLabel.Languages.Spanish"}),
                            title: "Set Sspanish",
                            id: "id-window4-2",
                            action: (o, callback) => {
                                window.catex.app.language.setLanguage("es");
                            }
                        },
                    ]
                },
            ]
        }
    }
}

wireCatex(recalculateCatex());
