import {CreateCustomFormRenderHandlers, PanelTarget, ToastMessageType} from "../interfaces/Catex";
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {PolygonFormat, PolygonGenerator} from "polygons-generator";

const polygonGenerator = new PolygonGenerator({
    format: PolygonFormat.GeoJSON,
    randomize: false
});

interface Props {
    handlers: CreateCustomFormRenderHandlers;
}

const CreateCircleForm : React.FC<Props> = (props) => {
    const [inputs, setInputs] = useState({
        name: "",
        lon: 0,
        lat: 0,
        radius: 1
    })

    const onChange = (e:any) => {
        const {name, value, type} =  e.target;
        if (type==="text") setInputs({...inputs, [name]: value});
        if (type==="number") setInputs({...inputs, [name]: Number(value)});
    }

    const isReady = () => inputs.radius>=0;
    const onCancel = ()=>{
        window.catex.workspace.toastMessage({message:"Cancelled", type: ToastMessageType.warning});
    };
    const onSubmit = ()=>{
        console.log("Submitted", inputs);
        window.catex.workspace.toastMessage({message: "Success", type: ToastMessageType.success});
        const jsonFeatureCollection = generateNewCircle(inputs.lon, inputs.lat, inputs.radius);
        const label = `Circle ${inputs.name}`;
        const command = showGeoJSONData(jsonFeatureCollection, label);
        window.catex.workspace.emitCommand(command);
    }

    useEffect(() => {
        props.handlers.init({
            isReady,
            onCancel,
            onSubmit,
        })
    }, [inputs]);

    return (<form>
        <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" value={inputs.name} name="name" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label className="form-label">Longitude</label>
            <input className="form-control" type="number" value={inputs.lon} name="lon" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label className="form-label">Latitude</label>
            <input className="form-control" type="number" value={inputs.lat} name="lat" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label className="form-label">Radius</label>
            <input className="form-control" type="number" value={inputs.radius} name="radius" onChange={onChange}/>
        </div>
    </form>)
}


export function openCreateCircleForm() {
    window.catex.workspace.createCustomForm((element, handlers)=>{
            const root = ReactDOM.createRoot(element);
            root.render(<CreateCircleForm handlers={handlers} />);
        },
        {title: "Create circle"}
    )
}

function generateNewCircle(lon: number, lat: number, radius: number) {
    const radiusKm = 1;
    const numberOfPoints = 50;
    const res = polygonGenerator.generate(lat, lon, radiusKm, numberOfPoints) as any;
    res.features[0].id = 1;
    return res;
}

function showGeoJSONData(data: any, label: string) {
    return {
        "action": 10,
        "parameters": {
            "action": "MemoryFeatureLayer",
            "autozoom": true,
            "dataImport": {
                content: data,
                "type": "GeoJSON"
            },
            "layer": {
                "label": label,
                "selectable": true,
                "editable": false,
            },
            "model": {
                "format": "GeoJSON",
                "swapAxes": false
            }
        }
    }
}
