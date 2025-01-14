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

app.post("/api/turf/bezier", (req, res) => {
    const lineString = req.body;
    const voronoiPolygons = turf.bezier(lineString);
    res.json(voronoiPolygons);
});

app.get("/api/usa", (req, res) => {
    const query = req.query;
    const rows = [
        {
            id: "1.1",
            label: "American rivers",
            title: "WFS service containing rivers",
            type: "WFS",
            endpoint: "https://sampleservices.luciad.com/wfs",
            layers: ["usrivers"],
        },
        {
            id: "1.2",
            label: "American cities",
            title: "WFS service containing cities",
            type: "WFS",
            endpoint: "https://sampleservices.luciad.com/wfs",
            layers: ["ns4:t_cities__c__1214"],
        },
        {
            id: "1.3",
            label: "American states",
            title: "WMS service containing states",
            type: "WMS",
            endpoint: "https://sampleservices.luciad.com/wms",
            layers: ["states"],
        },
        {
            id: "1.4",
            label: "Los Angeles Satellite",
            title: "WMTS service containing satellite images",
            type: "WMTS",
            endpoint: "https://sampleservices.luciad.com/wmts",
            layers: ["4ceea49c-3e7c-4e2d-973d-c608fb2fb07e"],
        }
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



app.listen(PORT, ()=>{
    console.log(`App Listening on port ${PORT}`)
});
