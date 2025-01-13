import {generateNewPolygon} from "./polygonGenerator";
import {ToastMessageType} from "../interfaces/Catex";

const DynamicPolygonLayerID = "dynamic-polygon";

export function dynamicPolygon() {
    const map = window.catex.map.getMainMap();
    const layer = map.layerTree.findLayerById(DynamicPolygonLayerID);
    if (layer) {
        window.catex.workspace.toastMessage({message:"Dynamic layer already exist", type: ToastMessageType.warning});
        return;
    }

    const lon = -0.080;
    const lat =  51.46298
    const res1 = generateNewPolygon(lon, lat);
    const command = showGeoJSONData(res1, "Dynamic every 0.1 second");
    window.catex.workspace.emitCommand(command);

    //  Update every second
    const loop = () => {
        setTimeout(()=>{
            const layer = map.layerTree.findLayerById(DynamicPolygonLayerID);
            if (!layer) return;
            const feature  = layer.model.get(1);
            const res2 = generateNewPolygon(lon, lat);

            res2.features[0].geometry.coordinates[0] = res2.features[0].geometry.coordinates[0].map((c:any)=>{
                return [...c, 300];
            })

            const newFeature = window.catex.utils.GeoJSONToFeature({
                id: feature.id,
                properties: feature.properties,
                geometry:  res2.features[0].geometry
            });

            layer.model.put(newFeature);
            loop();
        }, 100);
    }
    loop();
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
                "id": DynamicPolygonLayerID,
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
