import { Catex , ToastMessageType} from "./interfaces/Catex";
import "./styles/index.scss";
import moment from "moment";
import {randomPolygon} from "./modules/randomPolygon";
import {dynamicPolygon} from "./modules/dynamicPolygon";
import {openBioForm} from "./modules/bioForm";
import {openSampleJSForm} from "./modules/SampleJSForm";
import {openSimpleVanillaForm} from "./modules/SimpleVanillaForm";
import {localDatasetsUSA} from "./modules/loadDatasets";

/*******************************/

window.catex = {
    map: {},
    app: {
        webservices: [
            {
                id: "cs1-id",
                label: "Sample datasets",
                title: "A custom service that provides a list of assets",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        const results = localDatasetsUSA(o);
                        callback(results);
                    }
                }
            },        ],
        navbarActions: [
            {
                label: "Show date",
                title: "Format date using 3rd party library",
                id: "id-a-1",
                action:()=>{
                    const date = moment(Date.now()).format("dddd, MMMM Do YYYY, h:mm:ss a");
                    window.catex.workspace.toastMessage({message:"Action one was triggered: " + date, type: ToastMessageType.info})
                }
            },
            {
                label: "Forms With JSON Schema",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub1",
                children: [
                    {
                        label: "Open Bio",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-1",
                        action:()=>{
                            openBioForm()
                        }
                    },
                ]
            },
            {
                label: "Forms With Javascript",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub2",
                children: [
                    {
                        label: "Enter your name",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-2-1",
                        action:()=>{
                            openSimpleVanillaForm()
                        }
                    },
                    {
                        label: "Calculate hypotenuse",
                        title: "Sample of custom button",
                        id: "id-form-2-2",
                        action:()=>{
                            openSampleJSForm()
                        }
                    },
                ]
            },
            {
                label: "Polygons",
                title: "Just a sample of GeoJSON decoder",
                id: "id-form-sub3",
                children: [
                    {
                        label: "Random polygon",
                        title: "Creates a random polygon",
                        id: "id-a-2",
                        action:()=>{
                            randomPolygon();
                        }
                    },
                    {
                        label: "Dynamic polygon",
                        title: "Creates a random polygon that changes every second",
                        id: "id-a-3",
                        action:()=>{
                            dynamicPolygon();
                        }
                    }
                ]
            },
        ]
    }

} as Catex;

