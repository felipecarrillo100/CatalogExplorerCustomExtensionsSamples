import {PolygonFormat, PolygonGenerator} from "polygons-generator";

const polygonGenerator = new PolygonGenerator({
    format: PolygonFormat.GeoJSON,
});

export function generateNewPolygon(lon: number, lat: number) {
    const radiusKm = 1;
    const numberOfPoints = 10;
    const res = polygonGenerator.generate(lat, lon, radiusKm, numberOfPoints) as any;
    res.features[0].id = 1;
    return res;
}
