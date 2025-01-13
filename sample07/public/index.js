window.catex = {
    app: {
        onAppReady: ()=> {
            console.log("Catex Object",window.catex)
        },
        navbarActions: [
            {
                label: "Trigger action 1",
                title: "Action 1",
                id: "uid01",
                action: (o, callback)=>{
                    alert("Action one triggered 1!")
                }
            },
            {
                label: "Trigger action 2",
                title: "Action 2",
                id: "uid02",
                action: (o, callback)=>{
                    alert("Action two triggered 2!")
                }
            }
        ],
        webservices: [
            {
                id: "cs1-usa-id",
                label: "USA datasets",
                title: "A custom service remotely hosted list of services provided asynchronously",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        localDatasets("usa",o).then(results=>callback(results));
                    }
                }
            },
            {
                id: "cs1-lucerna-id",
                label: "Lucerna datasets",
                title: "A custom service remotely hosted list of services provided asynchronously",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        localDatasets("lucerna",o).then(results=>callback(results));
                    }
                }
            }
        ]
    },
    featureLayer: {
        onMultiFeatureSelect: [
            {
                label: "Voronoi",
                title: "Calculate voronoi",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        if (o.features) {
                            if (o.features.length>1) {

                                const featureCollection = {
                                    type: "FeatureCollection",
                                    features: o.features.map(f=>({
                                        "type":"Feature",
                                        "properties":{},
                                        "geometry":{
                                            "type":"Point",
                                            "coordinates":[f.shape.focusPoint.x,f.shape.focusPoint.y]
                                        }
                                    }))
                                }
                                const newCommand = TurfJSONURLCommand('voronoi', featureCollection, 'Voronoi');
                                window.catex.workspace.emitCommand(newCommand);
                            }
                        }
                    }
                }
            },
        ]
    }

}

function TurfJSONURLCommand(algorthm, featureCollection, label) {
    return {
        "action": 10,
        "parameters": {
            "action": "MemoryFeatureLayer",
            "autozoom": true,
            "layer": {
                "label": label,
                "selectable": true,
                "editable": false,
            },
            "model": {
                url: `http://localhost:3000/api/turf/${algorthm}`,
                method: "POST",
                body: JSON.stringify(featureCollection),
                format: "GeoJSON",
                requestHeaders: {
                    "Content-Type": "application/json"
                }
            }
        }
    }
}

function localDatasets(service, params) {
    return new Promise(resolve=>{
        const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
        const request = `http://localhost:3000/api/${service}?${queryString}`
        fetch(request).then(response=>{
            if (response.ok) {
                response.json().then(data=>resolve(data))
            }
        })
    })
}
