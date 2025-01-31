import {CreateCustomFormRenderHandlers, ToastMessageType} from "../interfaces/Catex";
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

interface Props {
    handlers: CreateCustomFormRenderHandlers;
    id: string;
}

const WindowFeatureLayerContent : React.FC<Props> = (props) => {
    const [features, setFeatures] = useState([])
    const [selectedFeatureIDs, setSelectedFeatureIDs] = useState([])

    const onCancel = ()=>{
        window.catex.workspace.toastMessage({message:"Cancelled", type: ToastMessageType.warning});
    };
    const onSubmit = ()=>{
        window.catex.workspace.toastMessage({message:"Submitted", type: ToastMessageType.warning});
    }

    const initWindowContent = () => {
        const setMapListeners = () => {
            const map = window.catex.map.getMainMap();
            const layer = window.catex.map.getLayerByID(props.id);
            setFeatures(layer.workingSet.get());
            layer.workingSet.on("WorkingSetChanged",  (eventType: any, feature:any, id: any) => {
                setFeatures(layer.workingSet.get());
            });
            map.on("SelectionChanged", (selectionChangeEvent: any) => {
                const selectedObjects = map.selectedObjects;
                for (const selectedObject of selectedObjects) {
                    if (selectedObject.layer === layer) {
                        const selectedIDs = [];
                        for (const object of selectedObject.selected) {
                            selectedIDs.push(object.id);
                        }
                        setSelectedFeatureIDs(selectedIDs);
                    }
                }
            });
        }

        setMapListeners();

        window.catex.map.onMainMapUpdated(()=>{
            setMapListeners();
        })
    }

    useEffect(() => {
        console.log("Init")
        initWindowContent();
    }, [props.id]);

    useEffect(() => {
        props.handlers.init({
            onCancel,
            onSubmit,
        })
    }, []);

    const analizeFeatures = (features: any) => {
        const max = features.length>5? 5 :features.length;
        const allKeys = {} as any;
        for (let i=0; i<max; ++ i) {
            const properties = features[i].properties;
            const keys = Object.keys(properties);
            keys.map(k=>allKeys[k]=1)
        }
        return {keys: Object.keys(allKeys)};
    }

    const {keys}  = analizeFeatures(features);

    const onClick = (feature:any) => (event: any) => {
        const bounds = feature.shape.bounds;
        const bbox = [bounds.x, bounds.y, bounds.x+bounds.width, bounds.y+bounds.height]
        window.catex.map.fitToBounds(bbox);
        const layer = window.catex.map.getLayerByID(props.id);
        window.catex.map.getMainMap().selectObjects([{layer, objects: [feature]}])
    }

    return (<div>
        <table className="table table-dark table-striped">
            <thead>
            <tr>
                <th scope="col">id</th>
                {keys.map(key=>(<th scope="col" key={key}>{key}</th>))}
            </tr>
            </thead>
            <tbody>
                {features.map(feature=> {
                    const index = selectedFeatureIDs.findIndex(id=>id===feature.id);
                    return (<tr key={feature.id} onClick={onClick(feature)} className={index>-1?"bg-primary":undefined}>
                        <th scope="row">{feature.id}</th>
                        {keys.map(key=>(<td  key={key}>{feature.properties[key]}</td>))}
                    </tr>)
                })}
            </tbody>
        </table>
    </div>)
}


export function openListFeatureWindow() {
    const id = window.catex.map.getCurrentLayerID();
    const layer = window.catex.map.getLayerByID(id);
    if (!(layer.restoreCommand.action === "MemoryFeatureLayer" || layer.restoreCommand.action ==="WFSLayer")) {
        window.catex.workspace.toastMessage({message: "Select first a feature layer", type: ToastMessageType.warning})
        return;
    }
    window.catex.workspace.createCustomWindow((element, handlers)=>{
            const root = ReactDOM.createRoot(element);
            root.render(<WindowFeatureLayerContent handlers={handlers} id={id} />);
        },
        {
            uid: "window-1-"+id,
            title: "Features for " + layer.label,
            padding: "10px",
            initialSize: {height: 240, width: "50%"}
        }
    )
}
