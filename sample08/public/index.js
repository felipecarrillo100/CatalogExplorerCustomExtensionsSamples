const TomTomKey = "A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k";

window.catex = {
    app: {
        navbarActions: [
            {
                label: "About you",
                title: "Demo of JSON Schema capabilities",
                id: "uid01",
                action: (o, callback)=>{
                    MyJSONSchemademo();
                }
            },
            {
                label: "TomTom",
                title: "Demo of TomTOM API Integration",
                id: "uid02",
                children: [
                    {
                        label: "Tomtom Imagery",
                        title: "Open TomTom Imagery Layers",
                        id: "uid-sub01",
                        children: [
                            {
                                label: "Basic",
                                title: "Open a TMS layer 'basic' from the tomtom api",
                                id: "uid10",
                                action: (o, callback)=>{
                                    window.catex.workspace.emitCommand(tomtomLayerCommand("basic"))
                                }
                            },
                            {
                                label: "Hybrid",
                                title: "Open a TMS layer 'hybrid' from the tomtom api",
                                id: "uid11",
                                action: (o, callback)=>{
                                    window.catex.workspace.emitCommand(tomtomLayerCommand("hybrid"))
                                }
                            },
                            {
                                label: "Labels With Transparency",
                                title: "Open a TMS layer 'labels' from the tomtom api",
                                id: "uid12",
                                action: (o, callback)=>{
                                    window.catex.workspace.emitCommand(tomtomLayerCommand("labels"))
                                }
                            },
                        ]
                    },
                    {
                        label: "Tomtom Routing",
                        title: "TomTom point to point routing",
                        id: "uid-sub02",
                        children: [
                            {
                                label: "TomTom with Gazetteer",
                                title: "Calculates a route between two points using the Gazetteer",
                                id: "uid021",
                                action: (o, callback)=>{
                                    TomTomRoutingGazetteer();
                                }
                            },
                            {
                                label: "TomTom Points",
                                title: "Calculates a route between two points using the Pick Point Widget",
                                id: "uid022",
                                action: (o, callback)=>{
                                    TomTomRoutingPoints();
                                }
                            },
                        ],
                    },
                ]
            },
        ]
    },
    data: {
        transformers: [
            {
                name: "TOMTOM",
                extensions: "json",
                transform: (dataStr) => {
                    const tomtomResponse = JSON.parse(dataStr);
                    const features = [];
                    if (tomtomResponse.routes.length > 0 && tomtomResponse.routes[0].legs.length > 0) {
                        const coordinates = tomtomResponse.routes[0].legs[0].points.map((point)=>[point.longitude, point.latitude]);
                        const lineString = { type: 'LineString', coordinates};
                        const feature = {id: 0, type:"Feature", geometry: lineString, properties:tomtomResponse.routes[0].summary};
                        features.push(feature);
                    }
                    return JSON.stringify(features);
                }
            }
        ]
    }
}

function tomtomLayerCommand(layerName)  {
    return {
        "action": 10,
        "parameters": {
            "action": "TMSLayer",
            "layer": {
                "label": `Tomtom ${layerName}`,
            },
            "model": {
                "baseURL": `https://{s}.api.tomtom.com/map/1/tile/${layerName}/main/{z}/{x}/{-y}.png?key=${TomTomKey}&tileSize=256`,
                "levelCount": 21,
                "subdomains": [
                    "a",
                    "b",
                    "c"
                ]
            }
        }
    }
}

function MyJSONSchemademo() {
    window.catex.workspace.createJSONSchemaForm(aboutYouForm(), {
        onChange: (formData)=> {
            //  console.log(JSON.stringify(formData, null, 2));
        },
        onCancel: ()=>{
            console.log('Cancel');
            window.catex.workspace.toastMessage({message:"Command canceled", type:"warning"})
        },
        onSuccess:(formData) => {
            console.log('Success',JSON.stringify(formData, null, 2));
            window.catex.workspace.toastMessage({message:"Command submitted", type:"info"})
        }
    })
}

function TomTomRoutingGazetteer() {
    window.catex.workspace.createJSONSchemaForm(tomtomInputsGazetteer(), {
        onChange: (formData)=> {
            //  console.log(JSON.stringify(formData, null, 2));
        },
        onCancel: ()=>{
            console.log('Cancel');
            window.catex.workspace.toastMessage({message:"Command canceled by user", type:"warning"})
        },
        onSuccess:(formData) => {
            console.log(formData);
            const newCommand = TomTomAPIURLCommand(
                [formData.origin.point.coordinates[1], formData.origin.point.coordinates[0]],
                [formData.destination.point.coordinates[1], formData.destination.point.coordinates[0]],
                'Tomtom route: ' + formData.travelMode,
                formData
            );
            window.catex.workspace.emitCommand(newCommand);
            window.catex.workspace.toastMessage({message:"Command submitted", type:"info"})
        }
    })
}

function TomTomRoutingPoints() {
    window.catex.workspace.createJSONSchemaForm(tomtomInputsPoints(), {
        onChange: (formData)=> {
            //  console.log(JSON.stringify(formData, null, 2));
        },
        onCancel: ()=>{
            console.log('Cancel');
            window.catex.workspace.toastMessage({message:"Command canceled by user", type:"warning"})
        },
        onSuccess:(formData) => {
            console.log(formData);
            const newCommand = TomTomAPIURLCommand(
                [formData.origin.coordinates[1], formData.origin.coordinates[0]],
                [formData.destination.coordinates[1], formData.destination.coordinates[0]],
                'Tomtom route: ' + formData.travelMode,
                formData
            );
            window.catex.workspace.emitCommand(newCommand);
            window.catex.workspace.toastMessage({message:"Command submitted", type:"info"})
        }
    })
}



function aboutYouForm() {
    return {
        schema: {
            "type": "object",
            "title": "About you",
            "properties": {
              "Lastname": {
                "title": "Enter your lastname",
                "type": "string"
              },
              "Firstname": {
                "title": "Enter your firstname",
                "type": "string"
              },
              "Age": {
                "title": "Enter your age",
                "type": "number",
                "minimum": 18,
                "maximum": 100,
              },
              "SalaryBand": {
                "title": "Salary band",
                "type": "integer",
                "minimum": 0,
                "maximum": 100000,
                "multipleOf": 10000
              }
            }
          }
           ,
        uiSchema: {
            "Age": {
                "ui:widget": "updown"
              },
            "SalaryBand": {
              "ui:widget": "range",
              'ui:options': {
                inputType: 'range',
              },
            }
          },
          formData: {
            Age: 18,
          }
    }
}

function tomtomInputsGazetteer() {
    return {
        schema: {
            "type": "object",
            "title": "Tomtom route",
            "description": "Enter the settings for your route:",
            "properties": {
                "origin": {title: "Enter origin", ...window.catex.JSONSchema.schema.GazetteerPoint},
                "destination": {title: "Enter destination", ...window.catex.JSONSchema.schema.GazetteerPoint},
                "travelMode": {
                    "title": "Select the mode",
                    "description": "The mode to calculate the route",
                    type: "string",
                    default: "car",
                    enum: [
                        "car", "truck", "taxi", "bus", "van", "motorcycle"
                    ]
                },
            },
            required: [
                "travelMode"
            ]
        },
        uiSchema: {
            "origin": window.catex.JSONSchema.uiSchema.GazetteerPoint,
            "destination": window.catex.JSONSchema.uiSchema.GazetteerPoint,
        }
    }
}

function tomtomInputsPoints() {
    return {
        schema: {
            "type": "object",
            "title": "Tomtom route",
            "description": "Enter the settings for your route:",
            "properties": {
                "origin": {title: "Enter origin", ...window.catex.JSONSchema.schema.Point},
                "destination": {title: "Enter destination", ...window.catex.JSONSchema.schema.Point},
                "travelMode": {
                    "title": "Select the mode",
                    "description": "The mode to calculate the route",
                    type: "string",
                    default: "car",
                    enum: [
                        "car", "truck", "taxi", "bus", "van", "motorcycle"
                    ]
                },
            },
            required: [
                "travelMode"
            ]
        },
        uiSchema: {
            "origin": window.catex.JSONSchema.uiSchema.Point,
            "destination": window.catex.JSONSchema.uiSchema.Point,
        }
    }
}

function TomTomAPIURLCommand (point1, point2, label, options) {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${point1[0]},${point1[1]}:${point2[0]},${point2[1]}/json?&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=${options.travelMode}&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=${TomTomKey}`;
    return {
        "action": 10,
        "parameters": {
            "action": "MemoryFeatureLayer",
            "autozoom": true,
            "layer": {
                "label": label,
                "selectable": true,
                "editable": false,
                painterSettings
            },
            "model": {
                transformer: "TOMTOM",
                url,
                requestHeaders: {
                    "Content-Type": "application/json"
                }
            }
        }
    }

}

const painterSettings = {"commons":{"balloon":false,"heatmap":{"enabled":false,"maximum":20,"normalizedGradient":[{"level":0,"color":"rgba( 0 , 0 , 255, 0.9)"},{"level":0.25,"color":"rgba( 0 , 255 , 255, 0.9)"},{"level":0.5,"color":"rgba( 0 , 255 , 0, 0.9)"},{"level":0.75,"color":"rgba( 255 , 255 , 0, 0.9)"},{"level":1,"color":"rgba( 255 , 0 , 0, 0.9)"}]}},"default":{"labelStyle":{"background":{"fill":{"color":"rgba(138, 200, 255, 0)"},"stroke":{"color":"rgba(138, 200, 255, 0)"}},"case":"none","font":{"bold":true,"fontFamily":"'Times New Roman', Times, serif","fontSize":"14px","italic":false,"underline":false},"labelProperty":"","stroke":{"color":"rgba(0,255,255,1)"}},"lineStyle":{"draped":true,"drapeTarget":1,"stroke":{"color":"rgb(138, 200, 255)","dashIndex":"solid","width":4}},"pointStyle":{"draped":true,"drapeTarget":1,"fill":{"color":"rgba(138,200,255,0.8)"},"heading":{"default":"","property":"","scale":1},"shape":"gradient-circle","size":{"height":16,"width":16},"anchorX":"","anchorY":"","stroke":{"color":"rgb(29,74,118)","width":1},"url":""},"shapeStyle":{"draped":true,"drapeTarget":1,"fill":{"color":"rgba(255, 0, 0, 0.6)"},"stroke":{"color":"rgb(255, 255, 0)","dashIndex":"solid","width":4},"extruded":{"type":"Flat","height":{"property":"","scale":1},"minHeight":{"property":"","scale":1}}}},"painterType":"DefaultPainter","selected":{"labelStyle":{"background":{"fill":{"color":"rgba(138, 200, 255, 0.8)"},"stroke":{"color":"rgba(138, 200, 255, 0.8)"}},"case":"none","color":"rgba(0,0,255,1)","font":{"bold":true,"fontFamily":"'Times New Roman', Times, serif","fontSize":"14px","italic":false,"underline":false},"labelProperty":"","stroke":{"color":"rgba(0,255,255,1)"}},"lineStyle":{"draped":true,"drapeTarget":1,"stroke":{"color":"rgb(0, 128, 256)","dashIndex":"solid","width":4}},"pointStyle":{"draped":true,"drapeTarget":1,"fill":{"color":"rgba(255, 200, 255, 0.8)"},"heading":{"default":"","property":"","scale":1},"shape":"gradient-circle","size":{"height":18,"width":18},"anchorX":"","anchorY":"","stroke":{"color":"rgba(146,24,48,1)","width":1},"url":""},"shapeStyle":{"fill":{"color":"rgba(0, 255, 0, 0.6)"},"stroke":{"color":"rgb(255, 255, 255)","dashIndex":"solid","width":4},"extruded":{"type":"Flat","height":{"property":"","scale":1},"minHeight":{"property":"","scale":1}},"drapeTarget":0}}}
