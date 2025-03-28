# CatalogExplorer Custom Extensions
## Data Transformers

Data transformers enable you to modify data before it is loaded into a layer.

Use case: Imagine you are querying an external API, but the response is in a format that Catalog
Explorer cannot interpret. In such cases, you can utilize a data transformer to convert the API’s
proprietary result into a format that Catalog Explorer can understand, such as GeoJSON.

In this example, we will use the TomTom API. We will pass two points to the API, and it will return a
result. Then, the data transformer will convert the TomTom result into a GeoJSON polyline.

Hooks required:
`data.transformers` array.

In this exercise, we’ll implement an action in response to the featureLayer.onMultiFeatureSelect event to calculate a route between two points.

### Procedure

Let's reuse the code we wrote in sample04

1. Copy the contents of the folder sample04 to sample05
2. Navigate to the sample05 folder and start the web server using:
```shell
serve public -C
```
3. This sample requires a TomTom API key. Go to https://developer.tomtom.com/store/maps-api and
   register for a free account. Create an API key and replace the “api_key_placeholder” with the actual
   key.

4. Edit the content of index.js inside the public folder with the following content:

```JavaScript
const TomTomKey = "api_key_placeholder";

window.catex = {
    featureLayer: {
        onMultiFeatureSelect: [{
            label: "TomTom route",
            title: "Calculate Route using TomTom API",
            action: function(o, callback) {
                if (typeof callback === "function") {
                    if (o.features) {
                        if (o.features.length == 2) {
                            const point1 = o.features[0].shape.focusPoint;
                            const point2 = o.features[1].shape.focusPoint;
                            const newCommand = TomTomRouteAPIURLCommand([point1.y, point1.x], [point2.y, point2.x], 'TomTom route');
                            window.catex.workspace.emitCommand(newCommand);
                        }
                    }
                }
            }
        },
        ]
    },
    data: {
        transformers: [{
            name: "TOMTOM",
            extensions: "json",
            transform: (dataStr) => {
                const tomtomResponse = JSON.parse(dataStr);
                const features = [];
                if (tomtomResponse.routes.length > 0 &&
                    tomtomResponse.routes[0].legs.length > 0) {
                    const coordinates =
                        tomtomResponse.routes[0].legs[0].points.map(point => [point.longitude,
                            point.latitude
                        ]);
                    const lineString = {
                        type: 'LineString',
                        coordinates
                    };
                    const feature = {
                        id: 0,
                        type: "Feature",
                        geometry: lineString,
                        properties: tomtomResponse.routes[0].summary
                    };
                    features.push(feature);
                }
                return JSON.stringify(features);
            }
        }]
    }
}

function TomTomRouteAPIURLCommand(point1, point2, label) {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${point1[0]},${point1[1]}:${point2[0]},${point2[1]}/json?&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=${TomTomKey}`;
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
```
5. Reload Catalog Explorer:

http://localhost:8080/catalogexplorer/home/

6. Open a WFS layer, such as:
https://sampleservices.luciad.com/wfs
7. Next, open the layer named City 125. Select and right-click on two cities of your choice.
   This will open a context menu. Select TomTom Route, this will trigger a call to the Tomtom API to determine a route between the selected cities.


### Expected outcomes:
* Catalog Explorer loads along with the custom extension.
* Right-clicking on selected features triggers the appearance of a context menu.
* The context menu includes the action "Tomtom route" that you defined.
* Clicking on the action calls the Tomtom API, and the response is displayed on the screen.

<strong>HINT:</strong> For more information about the TomTom route API, visit:

https://developer.tomtom.com/routing-api/documentation/routing/calculate-route

### Activities:
* Activity 1: Modify you action `Tomtom route` in `featureLayer.onMultiFeatureSelect` in such a way that TommTom route action is only show when you select 2 features. You can do this by defining a `validate` function. Look at the code snippet below:
```javascript
        onMultiFeatureSelect: [
            {
                label: "Tomtom route",
                title: "Calculate Route using Tomtom API",
                validate: function(o){
                    // The action will only show when 2 features are selected.
                    return o.features.length === 2;
                },
                action: function(o, callback) {
                   <your code>   
                }
            },
        ]
```
* Activity 2: In this activity you need to integrate the TomTom API for Points of Interest to find hospital within 2km from a point.

The TomTom POI API supports many parameters. For simplicity, let's limit to the following: lon, lat, radius.

<strong>HINT:</strong> For more information about the TomTom POI API, visit:

https://developer.tomtom.com/search-api/documentation/search-service/points-of-interest-search

<strong>HINT:</strong> You will use the hook `featureLayer.onFeatureSelect` to detect a point selected and define a new action called `Find Hospitals` and write the code required.

<strong>HINT:</strong> You will require a new Data Transformer `data:transformers`

The following code snippet illustrates how the data transformer will look like:
```shell
[
  ...otherDataTransformers,
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
```

The call to the TomTom POI API wil be done in the command, don't forget to set the `transformer` accordingly. Your implementation should be something like this:
```javascript
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
                "editable": false
            },
            "model": {
                transformer: "TOMTOM-POI",
                url
            }
        }
    }
}
```
* Open a WFS for `City 125` as you did before. Right-click on a city and "Find Hospitals". The Hospitals around the selected city will be displayed.
* Select the layer `Hospitals` from the layer control. Right-click it and select `Vector styling`, changed the icon to a `cross` and change the color to red with red borders. The hospitals will be shown with a cross icon in the map.
* Select `Vector styling` one more time for hospitals, and select `Label Style`  and set the `property` to `name`, the name of the hospital will be show next to the icon.


### Optional Activity
Combine this exercise with Exercise 3 to allow adding a TomTom map-tiles layer.
<strong>HINT:</strong> Refer to `sample03` and copy/paste the required code

## Run the solution

```shell
serve public -C
```

Once running you need to configure CatalogExplorer custom extensions to retrieve the Javascript and CSS from these locations:

JavaScript (CDN):
```
http://localhost:3000/index.js
```

CSS (CDN):
```
http://localhost:3000/index.css
```

