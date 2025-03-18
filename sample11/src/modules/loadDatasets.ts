import {
    CustomServiceQueryOptions,
    CustomWebServiceEntryList,
    CustomWebServiceEntryType,
    CustomWebServiceResult
} from "../interfaces/Catex";

export function localDatasetsUSA(query:CustomServiceQueryOptions):CustomWebServiceResult {
    const rows: CustomWebServiceEntryList = [
        {
            id: "1.1",
            label: "American rivers",
            title: "WFS service containing rivers",
            type: CustomWebServiceEntryType.WFS,
            endpoint: "https://sampleservices.luciad.com/wfs",
            layers: ["usrivers"],
        },
        {
            id: "1.2",
            label: "American cities",
            title: "WFS service containing cities",
            type: CustomWebServiceEntryType.WFS,
            endpoint: "https://sampleservices.luciad.com/wfs",
            layers: ["ns4:t_cities__c__1214"],
        },
        {
            id: "1.3",
            label: "American states",
            title: "WMS service containing states",
            type: CustomWebServiceEntryType.WMS,
            endpoint: "https://sampleservices.luciad.com/wms",
            layers: ["states"],
        },
        {
            id: "1.4",
            label: "Los Angeles Satellite",
            title: "WMTS service containing satellite images",
            type: CustomWebServiceEntryType.WMTS,
            endpoint: "https://sampleservices.luciad.com/wmts",
            layers: ["4ceea49c-3e7c-4e2d-973d-c608fb2fb07e"],
        },
        {
            id: "2.1",
            label: "Lucerna Panoramas",
            title: "PANORAMA",
            type: CustomWebServiceEntryType.PANORAMA,
            endpoint: "https://sampledata.luciad.com/data/panoramics/LucernePegasus/cubemap_final.json",
        },
        {
            id: "2.2",
            label: "Lucerna Mesh",
            title: "3D Tiles",
            type: CustomWebServiceEntryType.MESH,
            endpoint: "https://sampledata.luciad.com/data/ogc3dtiles/LucerneAirborneMesh/tileset.json",
        },
        {
            id: "2.3",
            label: "CustomCommand",
            title: "A KML file",
            type: "KML",
            command: CommandOpenKML(),
        }
    ]
    const matches = rows.filter(r=>r.label.toLowerCase().indexOf(query.search.toLowerCase())!==-1);
    const pageNumber = Number(query.pageNumber);
    const pageSize = Number(query.pageSize);
    const paginated = matches.sort((a,b)=>a>b?1:a<b?-1:0).slice(pageNumber * pageSize, (pageNumber+1) * pageSize);
    return {
        rows: paginated,
        matches: matches.length,
        total: rows.length
    };
}

function CommandOpenKML() {
    return {
        "action": 10,
        "parameters": {
            "action": "KMLLayer",
            "autozoom": true,
            "layer": {
                "label": "twinpeaks.kml",
                "selectable": true,
                "editable": false,
            },
            "model": {
                "url": "https://raw.githubusercontent.com/felipecarrillo100/kml/master/twinpeaks.kml",
            }
        }
    }
}
