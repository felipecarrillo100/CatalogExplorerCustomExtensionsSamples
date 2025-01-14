# CatalogExplorer Custom Extensions
## Creating a REST API

In mathematics, a Voronoi diagram is a partition of a plane into regions close to each of a given set of
objects. This exercise will create a REST API entry point to calculate the Voronoi of a collection of points.
Rather than implementing the Voronoi from scratch we will use an existing third-party library called @turf.
The Voronoi requires a collection of points as input, since a collection of points can be large it is
convenient to use POST to pass the input as part of the body on the http request

### Procedure

Let's reuse the code we wrote in sample05

1. Create a folder called sample07
2. Create a Custom Extension as CDN and assign it to the test profile using the url:

   http://localhost:3000/index.js
3. Inside the folder, called sample07, create a project using npm init, take all the defaults from the prompt
```shell
   npm init
```
4. Installed the required dependencies for our node project.

The Library `express` is used to create web applications and APIs in NodeJS, while `cors` is a library that easily enables CORS in our application
```shell
   npm install express cors
```
Library `@turf/turf` provides many geospatial operations
```shell
   npm install @turf/turf
```
5. In the sample code below, a REST endpoint is created to receive the collection of points in a POST
   request. The collection of points is a JSON array in the body of the HTTP request.
6. Inside sample07 folder create `index.js` with the following content

```javascript
const path = require('path')
const express = require('express');
const cors = require('cors');
const turf = require('@turf/turf');
const PORT = 3000;
const app = express();
app.use(express.json())
app.use(cors());
app.use('/', express.static(path.join(__dirname, 'public')));
app.post("/api/turf/voronoi", (req, res) => {
   const collection = req.body;
   const bbox = turf.bbox(collection);
   const options = {
      bbox
   };
   const voronoiPolygons = turf.voronoi(collection, options);
   res.json(voronoiPolygons);
});
app.listen(PORT, () => {
   console.log(`App Listening on port ${PORT}`)
});
```
7. Inside sample07 folder create `public/index.js` with the following content
```javascript
window.catex = {
   featureLayer: {
      onMultiFeatureSelect: [{
         label: "Voronoi",
         title: "Calculate voronoi",
         action: function(o, callback) {
            if (typeof callback === "function") {
               if (o.features) {
                  if (o.features.length > 1) {
                     const featureCollection = {
                        type: "FeatureCollection",
                        features: o.features.map(f => ({
                           "type": "Feature",
                           "properties": {},
                           "geometry": {
                              "type": "Point",
                              "coordinates": [f.shape.focusPoint.x, f.shape.focusPoint.y]
                           }
                        }))
                     }
                     const newCommand =
                             TurfJSONURLCommand('voronoi', featureCollection, 'Voronoi');
                     window.catex.workspace.emitCommand(newCommand);
                  }
               }
            }
         }
      }, ]
   }
}

function TurfJSONURLCommand(algorthm, bodyContent, label) {
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
            body: JSON.stringify(bodyContent),
            format: "GeoJSON",
            requestHeaders: {
               "Content-Type": "application/json"
            }
         }
      }
   }
}
```
<strong>Note:</strong> Catalog Explorer by default uses the HTTP method "GET" when making calls to an API. However, when you need to transfer 
large amounts of data, the method "POST" is more suitable. Since, in this example, we need to transfer the entire collection of points, using POST is the correct solution, and we pass the collection content as part of the body.

9. Run the backend:
```shell
   node index
```
9. Reload Catalog Explorer:

http://localhost:8080/catalogexplorer/home/

10. Open a WFS layer, such as:

https://sampleservices.luciad.com/wfs

11. Open the layer City 125.
12. Select all the cities. Call the Voronoi API to calculate the Voronoi areas for all the cities in the USA

### Expected outcomes:
* Catalog Explorer loads together with the custom extension.
* When all cities selected, on right click a context menu appear with Voronoi.
* Voronoi areas are calculated and display.

### Activities:
* In this example we implemented Voronoi calculation. Modify the code to add a new action that allows you to calculate a Bezier curve for the points selected.

<strong>Hint:</strong> The Voronoi API expects a collection of features, the Bezier curve expects a Feature LineString. Look at the following code snippet:

```javascript
if (o.features) {
   if (o.features.length>1) {
      const featureLineString = {
         "type":"Feature",
         "properties":{},
         "geometry":{
            "type":"LineString",
            "coordinates":o.features.map(f=>[f.shape.focusPoint.x,f.shape.focusPoint.y])
         }
      }
      const newCommand = TurfJSONURLCommand('bezier', featureLineString, 'Bezier');
      window.catex.workspace.emitCommand(newCommand);
   }
}
```
On the backend you will require to add a new API entry

```javascript
app.post("/api/turf/bezier", (req, res) => {
   const lineString = req.body;
   const bezierLine = turf.bezier(lineString);
   res.json(bezierLine);
});
```
### Optional Activity:

In sample06 we learned how to implement `Curated Assets` in the front end. A very powerful use-case you is to store your `cCrated assets` in a database and expose them as a webservice that your users can interact with using the UI. 

As part of this optional activity try to move as much code as possible to the backend, storing, searching and paginating must be done server side. Keep it simple, instead of storing in a database you can store the list in memory similarly to sample06 but at the backend.

Try it first on your own. In case you are not able to complete it yourself, look at the solution to this exercise.

<strong>Hint:</strong>  You can implement the call to the API using fetch and pass the search and pagination parameters in the query string:

```javascript
function remoteDatasets(service, params) {
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
```
Then you need to implement the API entry in your backend.
```javascript
app.get("/api/lucerna", (req, res) => {
    const query = req.query;
    const rows = [
        {
            id: "1.1",
            label: "Lucerna Panoramas",
            title: "PANORAMA",
            type: "PANORAMA",
            endpoint: "https://sampledata.luciad.com/data/panoramics/LucernePegasus/cubemap_final.json",
        },
        {
            id: "1.2",
            label: "Lucerna Mesh",
            title: "3D Tiles",
            type: "MESH",
            endpoint: "https://sampledata.luciad.com/data/ogc3dtiles/LucerneAirborneMesh/tileset.json",
        },
        ...addMoreRows  
    ]
    const matches = rows.filter(r=>r.label.toLowerCase().indexOf(query.search.toLowerCase())!==-1);
    const pageNumber = Number(query.pageNumber);
    const pageSize = Number(query.pageSize);
    const paginated = matches.sort((a,b)=>a>b?1:a<b?-1:0).slice(pageNumber * pageSize, (pageNumber+1) * pageSize);
    const results = {
        rows: paginated,
        matches: matches.length,
        total: rows.length
    }
    res.json(results);
});

```



## Run the solution

Install the dependencies
```shell
npm install
```
Start the application

```shell
node index
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

