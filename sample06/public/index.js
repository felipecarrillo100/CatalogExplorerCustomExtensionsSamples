window.catex = {
    app: {
        webservices: [
            {
                id: "cs1-id",
                label: "Lucerna site",
                title: "A custom service that provides a list assets located in Lucerna",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        const results = localDatasets(o);
                        callback(results);
                    }
                }
            },
            {
                id: "cs2-id",
                label: "USA site",
                title: "A custom service that provides a list assets located in Lucerna",
                action: function(o, callback) {
                    if (typeof callback === "function") {
                        const results = localDatasetsUSA(o);
                        callback(results);
                    }
                }
            }
        ]
    }
}

function localDatasets(query) {
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
    return results;
}


function localDatasetsUSA(query) {
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
            layers: ["cities"],
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
    return results;
}
