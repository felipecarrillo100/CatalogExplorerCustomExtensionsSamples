import {CreateCustomFormRenderHandlers, ToastMessageType} from "../interfaces/Catex";
import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";

interface Props {
    handlers: CreateCustomFormRenderHandlers;
}

const SampleWindowContent : React.FC<Props> = (props) => {

    const [inputs, setInputs] = useState({name: "", lastname:""})
    const onCancel = ()=>{
        window.catex.workspace.toastMessage({message:"Cancelled by user", type: ToastMessageType.warning});
    };
    const onSubmit = ()=>{
        window.catex.workspace.toastMessage({message:`User has entered: ${inputs.name} ${inputs.lastname}`, type: ToastMessageType.success});
    }

    useEffect(() => {
        props.handlers.init({
            onCancel,
            onSubmit,
        })
    }, [inputs]);

    const onChange = (e:any) => {
        const {name, value, type} =  e.target;
        if (type==="text") setInputs({...inputs, [name]: value});
        if (type==="number") setInputs({...inputs, [name]: Number(value)});
    }

    return (<div>
        <h1>This is my content</h1>
        <h2>Subtitle</h2>
        <p>Some text</p>
        <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-control" type="text" value={inputs.name} name="name" onChange={onChange}/>
        </div>
        <div className="form-group">
            <label className="form-label">Lastname</label>
            <input className="form-control" type="text" value={inputs.lastname} name="lastname" onChange={onChange}/>
        </div>
        <button className="btn btn-secondary" onClick={props.handlers.cancel}>Close me</button>
        <button className="btn btn-primary" onClick={props.handlers.submit}>Submit me</button>
    </div>)
}


export function openReactWindow() {
    window.catex.workspace.createCustomWindow((element, handlers)=>{
            const root = ReactDOM.createRoot(element);
            root.render(<SampleWindowContent handlers={handlers} />);
        },
        {
            uid: "window-basic-sample",
            title: "Just a basic sample",
            padding: "10px",
            initialSize: {height: 400, width: "25%"}
        }
    )
}
