import {
    Catex,
    CATEX_CONTROL_MODE_TYPE,
    CATEX_EDIT_TOOLS_TYPE,
    CatexShapeType,
    ToastMessageType
} from "./interfaces/Catex";
import {openBioForm} from "./modules/bioForm";
import {openChartsForm} from "./componets/SampleChartsForm";
import {openCreateCircleForm} from "./componets/CreateCircleForm";
import {openCreateCircleWidgetForm} from "./componets/CreateCircleWidgetForm";
import {openReactWindow} from "./componets/SampleReactWindow";
import {openListFeatureWindow} from "./componets/ListFearturesWindow";


const AvailableActions = Object.keys(CATEX_EDIT_TOOLS_TYPE)
    .filter(key => isNaN(Number(key))) // Filter out the numeric keys
    .map(key => CATEX_EDIT_TOOLS_TYPE[key as keyof typeof CATEX_EDIT_TOOLS_TYPE]); // Map to the enum values


const AvailableModes  = Object.keys(CATEX_CONTROL_MODE_TYPE)
    .filter(key => isNaN(Number(key))) // Filter out the numeric keys
    .map(key => CATEX_CONTROL_MODE_TYPE[key as keyof typeof CATEX_CONTROL_MODE_TYPE]); // Map to the enum values

const AvailableShapes  = Object.keys(CatexShapeType)
    .filter(key => isNaN(Number(key))) // Filter out the numeric keys
    .map(key => CatexShapeType[key as keyof typeof CatexShapeType]); // Map to the enum values


export function setCatex(catex: Catex) {
    window.catex = catex;
}

setCatex({
    map: {
        onControllerChange: () => {
            console.log("Control has changed!");
            if (window.catex.map.getController) console.log(window.catex.map.getController());
        },
    },
    app: {
        navbarActions: [
            {
                label: "Control Modes",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub00",
                children: [
                    ...AvailableModes.filter(e=>e!==CATEX_CONTROL_MODE_TYPE.CreateShapeController && e!==CATEX_CONTROL_MODE_TYPE.UNKNOWN).map(action=>(
                        {
                            label: `${action}`,
                            title: "Application mode",
                            id: `id-action-mode-${action}`,
                            action: (o: any, callback:any) => {
                                const command = {
                                    action: 3001,
                                    parameters: {
                                        name: action
                                    }
                                }
                                window.catex.workspace.emitCommand(command)
                            }
                        }
                    )),
                    ...AvailableShapes.map(shape=>(
                        {
                            label: `${CATEX_CONTROL_MODE_TYPE.CreateShapeController} ${shape}`,
                            title: `Adds a ${shape}`,
                            id: `id-action-mode-${CATEX_CONTROL_MODE_TYPE.CreateShapeController}-${shape}`,
                            action: (o: any, callback:any) => {
                                const command = {
                                    action: 3001,
                                    parameters: {
                                        name: CATEX_CONTROL_MODE_TYPE.CreateShapeController,
                                        shapeType: shape
                                    }
                                }
                                window.catex.workspace.emitCommand(command)
                            }
                        }
                    )),

                ]
            },
            {
                label: "Edit tools",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub0",
                children:
                    AvailableActions.map(action=>(
                        {
                            label: `${action}`,
                            title: "Just a sample of JSON Schema",
                            id: `id-action-type-${action}`,
                            action: (o: any, callback:any) => {
                                const command = {
                                    action: 3002,
                                    parameters: {
                                        name: action
                                    }
                                }
                                window.catex.workspace.emitCommand(command)
                            }
                        }
                    ))
            },
            {
                label: "Get Current Layer",
                title: "Get ID of current layer",
                id: "id-form-a1",
                action: (o, callback) => {
                    window.catex.workspace.toastMessage({message: window.catex.map.getCurrentLayerID(), type: ToastMessageType.info});
                }
            },
            {
                label: "Set Annotations layer as Current",
                title: "Set ID of current layer",
                id: "id-form-a2",
                action: (o, callback) => {
                    if (window.catex.map.setCurrentLayerByID("AnnotationsLayerId"))
                        window.catex.workspace.toastMessage({message: "Annotations layer was selected", type: ToastMessageType.info});
                    else
                        window.catex.workspace.toastMessage({message: "Annotations layer not found", type: ToastMessageType.warning});
                }
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
