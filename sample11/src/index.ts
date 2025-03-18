import {Catex, ToastMessageType} from "./interfaces/Catex";
import "./styles/index.scss";
import moment from "moment";
import {randomPolygon} from "./modules/randomPolygon";
import {dynamicPolygon} from "./modules/dynamicPolygon";
import {openBioForm} from "./modules/bioForm";
import {openSampleJSForm} from "./modules/SampleJSForm";
import {openSimpleVanillaForm, openSimpleVanillaWindow} from "./modules/SimpleVanillaForm";
import {localDatasetsUSA} from "./modules/loadDatasets";

/*******************************/
export function setCatex(catex: Catex) {
    window.catex = catex;
}


setCatex( {
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
    featureLayer: {
        onFeatureSelect: [
            {
                label: "This feature is a point",
                title: "Hint for single selected feature",
                validate: (parameters)=>{
                    const feature = parameters.feature;
                    const geoJSONFeature = window.catex.utils.featureToGeoJSON(feature);
                    return geoJSONFeature && geoJSONFeature.geometry.type === "Point";
                },
                action: (parameters, callback) => {
                    console.log(parameters.feature.properties.CITY)
                }
            },
            {
                label: "Show in balloon single selected feature",
                title: "Hint for single selected feature",
                action: (parameters, callback) => {
                    callback({ newValue: "From Custom extension", test:"abc"})
                }
            }
        ],
        onMultiFeatureSelect: [
            {
                label: "Show multiple selected features",
                title: "Hint for multiple selected features",
                validate: (parameters)=>{
                    return parameters.features.length ==2
                },
                action: (parameters, callback) => {
                    console.log(parameters)
                }
            }
        ]
    },
    ogc3dTiles: {
        onFeatureSelect: [
            {
                label: "Show single selected feature",
                title: "Hint for single selected feature",
                action: (parameters, callback) => {
                    console.log(parameters)
                }
            },
            {
                label: "Show in balloon single selected feature",
                title: "Hint for single selected feature",
                action: (parameters, callback) => {
                    callback({...parameters.feature.properties, newValue: "From Custom extension"})
                }
            }
        ],
        onMultiFeatureSelect: [
            {
                label: "Show multiple selected features",
                title: "Hint for multiple selected features",
                action: (parameters, callback) => {
                    console.log(parameters)
                }
            }
        ]
    },
    app: {
        webservices: [
            // @ts-ignore
            {
                id: "cs1-id",
                label: "Sample datasets 1",
                title: "A custom service that provides a list of assets",
                action: function(query, setResults) {
                    if (typeof setResults === "function") {
                        const results = localDatasetsUSA(query);
                        setResults(results);
                    }
                }
            },
            {
                id: "cs2-id",
                label: "Sample datasets 2",
                title: "A custom service that provides a list of assets",
                action: function(query, setResults) {
                    if (typeof setResults === "function") {
                        const results = localDatasetsUSA(query);
                        setResults(results);
                    }
                }
            },
        ],
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
            { divider: true},
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
                label: "Window With Javascript",
                title: "A floating window",
                id: "id-form-sub2",
                children: [
                    {
                        label: "A floating Window 1",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-2-1",
                        action:()=>{
                            openSimpleVanillaWindow("window1")
                        }
                    },
                    {
                        label: "A floating Window 2",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-2-2",
                        action:()=>{
                            openSimpleVanillaWindow("window2")
                        }
                    },
                ]
            },
            {
                label: "Forms With Javascript",
                title: "Just a sample of Javascript Schema",
                id: "id-form-sub3",
                children: [
                    {
                        label: "Enter your name",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-3-1",
                        action:()=>{
                            openSimpleVanillaForm()
                        }
                    },
                    {
                        label: "Calculate hypotenuse",
                        title: "Sample of custom button",
                        id: "id-form-3-2",
                        action:()=>{
                            openSampleJSForm()
                        }
                    },
                ]
            },
            {
                label: "Polygons",
                title: "Just a sample of GeoJSON decoder",
                id: "id-form-sub4",
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
                    },
                ]
            },
        ]
    }
});
