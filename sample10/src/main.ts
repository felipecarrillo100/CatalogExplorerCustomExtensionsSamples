import {Catex, ToastMessageType} from "./interfaces/Catex";
import {openBioForm} from "./modules/bioForm";
import {openChartsForm} from "./componets/SampleChartsForm";
import {openCreateCircleForm} from "./componets/CreateCircleForm";
import {openCreateCircleWidgetForm} from "./componets/CreateCircleWidgetForm";
import {openWorkspace, openWorkspaceFromDB, RestoreWorkspaceBelgianFactoryCommand} from "./modules/workspaceopen";

window.catex = {
    map: {
        onMouseClick:[
            {
                action: function(o, callback) {
                    console.log("Mouse click on map from Custom Extension CDN!!:", o);
                }
            },
        ],
        onMapMove:[
            {
                action: function(o, callback) {
                    console.log("Mouse onMapMoveEvent on map from Custom Extension CDN!!:", o);
                }
            },
        ],
        onMousePoint:[
            {
                action: function(o, callback) {
                    console.log("Mouse onMousePointEvent on map from Custom Extension CDN!!:", o);
                }
            },
        ]
    },
    app: {
        onAppReady: ()=> {
            window.catex.workspace.toastMessage({message:"App is ready", type:ToastMessageType.info});
            if (typeof window.catex.workspace.emitCommand!=="undefined") {
                window.catex.workspace.emitCommand(RestoreWorkspaceBelgianFactoryCommand());
            }
        },
        navbarActions: [
            {
                label: "Restore workspaces",
                title: "Samples to restore workspaces",
                id: "id-form-sub-workspaces",
                children:[
                    {
                        label: "Workspace DB id=1",
                        title: "Just a sample of JSON Schema",
                        id: "id-sub0-ws1-db",
                        action: (o, callback) => {
                            openWorkspaceFromDB(1);
                        }
                    },
                    {
                        label: "Workspace From String",
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
        ]
    }
} as Catex;
