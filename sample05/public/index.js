const tomtomkey = "A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k";

window.catex = {
    featureLayer: {
        onFeatureSelect: [
            {
                label: "Find Hospitals",
                title: "Finds Hospitals near a point",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        if (o.feature) {
                            const point1 = o.feature.shape.focusPoint;
                            const query = "hospitals";
                            const radius = 2000;  // 2KM radius
                            const newCommand = TomTomPOIAPIURLCommand([point1.y, point1.x], query, radius, 'Hospitals');
                            window.catex.workspace.emitCommand(newCommand);
                        }
                    }
                }
            },
        ],
        onMultiFeatureSelect: [
            {
                label: "Tomtom route",
                title: "Calculate Route using Tomtom API",
                validate: function(o){
                    return o.features.length === 2;
                },
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        if (o.features) {
                            if (o.features.length==2) {
                                const point1 = o.features[0].shape.focusPoint;
                                const point2 = o.features[1].shape.focusPoint;
                                const newCommand = TomTomRouteAPIURLCommand([point1.y, point1.x], [point2.y, point2.x], 'Tomtom route');
                                window.catex.workspace.emitCommand(newCommand);
                            }
                        }
                    }
                }
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
                        const coordinates = tomtomResponse.routes[0].legs[0].points.map(point=>[point.longitude, point.latitude]);
                        const lineString = { type: 'LineString', coordinates};
                        const feature = {id: 0, type:"Feature", geometry: lineString, properties:tomtomResponse.routes[0].summary};
                        features.push(feature);
                    }
                    return JSON.stringify(features);
                }
            },
            {
                name: "TOMTOM-POI",
                extensions: "json",
                transform: (dataStr) => {
                    const tomtomResponse = JSON.parse(dataStr);
                    const features = [];
                    if (tomtomResponse.results.length > 0) {
                        for (let result of tomtomResponse.results) {
                            const coordinates = [result.position.lon, result.position.lat];
                            const geometry = { type: 'Point', coordinates};
                            const feature = {
                                id: result.id,
                                type: "Feature",
                                geometry: geometry,
                                properties: result.poi
                            }
                            features.push(feature);
                        }
                    } else {
                        window.catex.workspace.toastMessage({message: "No matches found", type: "warning"})
                    }
                    return JSON.stringify(features);
                }
            }
        ]
    }
}

function TomTomRouteAPIURLCommand(point1, point2, label) {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${point1[0]},${point1[1]}:${point2[0]},${point2[1]}/json?&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=${tomtomkey}`;
    return {
        "action": 10,
        "parameters": {
            "action": "MemoryFeatureLayer",
            "autozoom": true,
            "layer": {
                "label": label,
                "selectable": true,
                "editable": false
            },
            "model": {
                transformer: "TOMTOM",
                url
            }
        }
    }
}

function TomTomPOIAPIURLCommand(point, query, radius, label) {
    const url = `https://api.tomtom.com/search/2/poiSearch/${query}.json?lat=${point[0]}&lon=${point[1]}&radius=${radius}&key=${tomtomkey}`;
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
                transformer: "TOMTOM-POI",
                url
            }
        }
    }
}

const painterSettings = {"commons":{"balloon":false,"heatmap":{"enabled":false,"maximum":20,"normalizedGradient":[{"level":0,"color":"rgba( 0 , 0 , 255, 0.9)"},{"level":0.25,"color":"rgba( 0 , 255 , 255, 0.9)"},{"level":0.5,"color":"rgba( 0 , 255 , 0, 0.9)"},{"level":0.75,"color":"rgba( 255 , 255 , 0, 0.9)"},{"level":1,"color":"rgba( 255 , 0 , 0, 0.9)"}]}},"default":{"labelStyle":{"background":{"fill":{"color":"rgba(138, 200, 255, 0)"},"stroke":{"color":"rgba(138, 200, 255, 0)"}},"case":"none","font":{"bold":true,"fontFamily":"'Times New Roman', Times, serif","fontSize":"14px","italic":false,"underline":false},"labelProperty":"name","stroke":{"color":"rgb(176,25,116)"}},"lineStyle":{"draped":true,"drapeTarget":1,"stroke":{"color":"rgb(138, 200, 255)","dashIndex":"solid","width":2}},"pointStyle":{"draped":true,"drapeTarget":1,"fill":{"color":"rgba(93,50,32,0.8)"},"heading":{"default":"","property":"","scale":1},"shape":"cross","size":{"height":24,"width":24},"anchorX":"","anchorY":"","stroke":{"color":"rgba(204,99,30,1)","width":1},"url":"","uom":"Pixels"},"shapeStyle":{"draped":true,"drapeTarget":1,"fill":{"color":"rgba(255, 0, 0, 0.6)"},"stroke":{"color":"rgb(255, 255, 0)","dashIndex":"solid","width":2},"extruded":{"type":"Flat","height":{"property":"","scale":1},"minHeight":{"property":"","scale":1}}}},"painterType":"DefaultPainter","selected":{"labelStyle":{"background":{"fill":{"color":"rgba(138, 200, 255, 0.8)"},"stroke":{"color":"rgba(138, 200, 255, 0.8)"}},"case":"none","color":"rgba(0,0,255,1)","font":{"bold":true,"fontFamily":"'Times New Roman', Times, serif","fontSize":"14px","italic":false,"underline":false},"labelProperty":"name","stroke":{"color":"rgb(176,25,116)"}},"lineStyle":{"draped":true,"drapeTarget":1,"stroke":{"color":"rgb(0, 128, 256)","dashIndex":"solid","width":2}},"pointStyle":{"draped":true,"drapeTarget":1,"fill":{"color":"rgba(255, 200, 255, 0.8)"},"heading":{"default":"","property":"","scale":1},"shape":"cross","size":{"height":18,"width":18},"anchorX":"","anchorY":"","stroke":{"color":"rgba(146,24,48,1)","width":1},"url":"","uom":"Pixels"},"shapeStyle":{"fill":{"color":"rgba(0, 255, 0, 0.6)"},"stroke":{"color":"rgb(255, 255, 255)","dashIndex":"solid","width":2},"extruded":{"type":"Flat","height":{"property":"","scale":1},"minHeight":{"property":"","scale":1}},"drapeTarget":0}}};
