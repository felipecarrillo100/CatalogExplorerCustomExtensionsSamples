
window.catex = {
    featureLayer: {
        onMultiFeatureSelect: [
            {
                label: "Tomtom route",
                title: "Calculate Route using Tomtom API",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        if (o.features) {
                            if (o.features.length==2) {
                                const point1 = o.features[0].shape.focusPoint;
                                const point2 = o.features[1].shape.focusPoint;
                                const newCommand = TomTomAPIURLCommand([point1.y, point1.x], [point2.y, point2.x], 'Tomtom route');
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
            }
        ]
    }
}

function TomTomAPIURLCommand(point1, point2, label) {
    const tomtomkey = "A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k";
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
