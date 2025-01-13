import {CreateCustomFormRenderHandlers, PredefinedLayers, ToastMessageType} from "../interfaces/Catex";
import React, {useEffect, useRef, useState} from "react";
import ReactDOM from "react-dom/client";
import {PolygonFormat, PolygonGenerator} from "polygons-generator";

const polygonGenerator = new PolygonGenerator({
    format: PolygonFormat.GeoJSON,
    randomize: false
});

interface Props {
    handlers: CreateCustomFormRenderHandlers;
}

const CreateCircleWidgetForm : React.FC<Props> =(props) => {
    const divRef = React.useRef(null as HTMLDivElement);
    const widget = useRef(null)

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

    const isReady = () => {
        widget.current.validate();
        return inputs.radius>=0
    }
    const onCancel = ()=>{
        window.catex.map.deleteLayerByID(PredefinedLayers.ClippingMask);
        window.catex.workspace.toastMessage({message:"Cancelled", type: ToastMessageType.warning});
    };
    const onSubmit = ()=>{
        window.catex.map.deleteLayerByID(PredefinedLayers.ClippingMask);
        console.log("Submitted", inputs);
        window.catex.workspace.toastMessage({message: "Success", type: ToastMessageType.success});
        const jsonFeatureCollection = generateNewCircle(widget.current.formData.point.coordinates[0], widget.current.formData.point.coordinates[1], inputs.radius);
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
    useEffect(() => {
        widget.current = window.catex.workspace.createFieldJSONSchema(divRef.current, JSONSChemaB(), props.handlers.fields);
        widget.current.onSuccess = (formData: any) => {
            console.log(formData);
        }
        widget.current.onChange = (formData: any) => {
            console.log(formData);
        }
    }, []);

    return (<form>
        <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" value={inputs.name} name="name" onChange={onChange}/>
        </div>
        <div ref={divRef} />
        <div className="form-group">
            <label className="form-label">Radius</label>
            <input className="form-control" type="number" value={inputs.radius} name="radius" onChange={onChange}/>
        </div>
    </form>)
}


export function openCreateCircleWidgetForm() {
    window.catex.workspace.createCustomForm((element, handlers)=>{
            const root = ReactDOM.createRoot(element);
            root.render(<CreateCircleWidgetForm handlers={handlers} />);
        },
        {title: "Create circle"}
    )
}

function generateNewCircle(lon: number, lat: number, radius: number) {
    const radiusKm = radius;
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

export function JSONSChemaB() {
    return {
        schema: {
            "type": "object",
            "properties": {
                "point": {title: "Enter Line", description:"Test 122", ...window.catex.JSONSchema.schema.Point},
            },
            required: [
                "point"
            ]
        },
        formData: {
        },
        uiSchema: {
            "point": window.catex.JSONSchema.uiSchema.Point,
        }
    }
}
