import moment from "moment";
import {generateNewPolygon} from "./polygonGenerator";

export function randomPolygon() {
    const lat = 51.46298;
    const lon = 0;
    const res = generateNewPolygon(lon, lat);
    const date = moment(Date.now()).format("MMMM Do YYYY, h:mm:ss a");

    const label = "Polygon " +  date;
    const command = showGeoJSONData(res, label);
    window.catex.workspace.emitCommand(command);
}

function showGeoJSONData(data: any, label: string) {
    return {
        "action": 10,
        "parameters": {
            "action": "MemoryFeatureLayer",
            "autozoom": true,
            "dataImport": {
                content: data,
                "type": "GeoJSON"
            },
            "layer": {
                "label": label,
                "selectable": true,
                "editable": false,
            },
            "model": {
                "format": "GeoJSON",
                "swapAxes": false
            }
        }
    }
}
