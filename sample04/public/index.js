window.catex = {
    featureLayer: {
        onFeatureSelect: [
            {
                label: "Show single selected feature",
                title: "Hint for single selected feature",
                action: (parameters, callback) => {
                    console.log(parameters.feature.properties.CITY)
                }
            },
            {
                label: "Show in balloon single selected feature",
                title: "Hint for single selected feature",
                action: (parameters, callback) => {
                    callserver(parameters.feature.id).then((data)=>{
                        callback({...parameters.feature.properties, maintenaceDate: data.maintenaceDate})
                    })
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
    }
}
