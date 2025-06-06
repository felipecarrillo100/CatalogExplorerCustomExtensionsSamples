import React, {useEffect} from "react";
import {CreateCustomFormRenderHandlers} from "../interfaces/Catex";
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import ReactDOM from "react-dom/client";
import {LanguageSettings} from "../modules/languageSettings";

const data = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];

interface Props {
    handlers: CreateCustomFormRenderHandlers;
}

const SampleChartsForm : React.FC<Props> =(props) => {

    const onCancel = ()=>{
        console.log("Cancelled");
    };
    const onSubmit = ()=>{
        console.log("Submitted");
    }

    useEffect(() => {
        props.handlers.init({
            onCancel,
            onSubmit,
        })
    });

    return (<>
        <div style={{ width: '100%' }}>
            <h4>{LanguageSettings.textByID({id:"SampleChartsForm.H4.title", defaultText: "Synchronized AreaCharts"})}</h4>
            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
            <p>{LanguageSettings.textByID({id:"SampleChartsForm.p.title", defaultText: "Maybe some other content"})}</p>

            <ResponsiveContainer width="100%" height={200}>
                <AreaChart
                    width={500}
                    height={200}
                    data={data}
                    syncId="anyId"
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </>)
}

export function openChartsForm() {
    window.catex.workspace.createCustomForm((element, handlers)=>{
            const root = ReactDOM.createRoot(element);
            root.render(<SampleChartsForm handlers={handlers} />);
        },
        {title: LanguageSettings.textByID({id:"SampleChartsForm.title", defaultText: "Charts from recharts"})}
    )
}
