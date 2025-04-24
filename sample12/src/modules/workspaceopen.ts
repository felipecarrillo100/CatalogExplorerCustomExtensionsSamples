export function openWorkspace() {
    window.catex.workspace.emitCommand(RestoreWorkspace())
}

function RestoreWorkspace() {
    return {
        "action": 3,
        "parameters": {
            "workspace": {
                "content": "{\"fileformat\":\"TridentWorkspace\",\"version\":\"1.0\",\"pictureSettings\":{\"saturation\":100,\"brightness\":100,\"contrast\":100,\"sepia\":0,\"grayscale\":0,\"invert\":0,\"enabled\":false},\"ecdisSettings\":{\"colorScheme\":\"day\",\"sounding\":false,\"displayCategory\":\"standard\",\"useTwoShades\":true,\"shallowContour\":2,\"safetyContour\":30,\"deepContour\":30,\"beam\":10,\"airDraft\":10,\"displayIsolatedDangersInShallowWater\":false,\"displayShallowPattern\":false,\"displaySoundings\":false},\"timeManager\":{\"range\":{\"min\":1707690002,\"max\":1707776402},\"interval\":{\"min\":1707729602,\"max\":1707736802},\"step\":1,\"currentTime\":1707733202},\"currentlayer\":\"2c21a3f1-eaf0-4a05-a2ab-3b75fec4246e\",\"layertree\":{\"action\":\"root\",\"layer\":{\"label\":\"root\",\"id\":\"a8c46d33-af9b-4044-b1f1-7aedd50818c9\",\"visible\":true,\"labeled\":true,\"treeNodeType\":\"LAYER_GROUP\"},\"nodes\":[{\"action\":\"TMSLayer\",\"layer\":{\"label\":\"OpenStreetMap\",\"id\":\"0bf0f05f-fdc7-403d-8c94-a021e23c5606\",\"parent_id\":\"a8c46d33-af9b-4044-b1f1-7aedd50818c9\",\"visible\":true,\"editable\":false,\"treeNodeType\":\"LAYER_RASTER\"},\"model\":{\"baseURL\":\"https://{s}.tile.openstreetmap.org/{z}/{x}/{-y}.png\",\"levelCount\":21,\"subdomains\":[\"a\",\"b\",\"c\"]}},{\"action\":\"TMSLayer\",\"layer\":{\"label\":\"Tomtom basic\",\"id\":\"b083a476-a498-44a4-a6bf-580e8f5919ee\",\"parent_id\":\"a8c46d33-af9b-4044-b1f1-7aedd50818c9\",\"visible\":true,\"editable\":false,\"treeNodeType\":\"LAYER_RASTER\"},\"model\":{\"baseURL\":\"https://{s}.api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{-y}.png?key=A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k&tileSize=256\",\"levelCount\":21,\"subdomains\":[\"a\",\"b\",\"c\"]}},{\"action\":\"TMSLayer\",\"layer\":{\"label\":\"Tomtom hybrid\",\"id\":\"2c21a3f1-eaf0-4a05-a2ab-3b75fec4246e\",\"parent_id\":\"a8c46d33-af9b-4044-b1f1-7aedd50818c9\",\"visible\":true,\"editable\":false,\"treeNodeType\":\"LAYER_RASTER\"},\"model\":{\"baseURL\":\"https://{s}.api.tomtom.com/map/1/tile/hybrid/main/{z}/{x}/{-y}.png?key=A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k&tileSize=256\",\"levelCount\":21,\"subdomains\":[\"a\",\"b\",\"c\"]}},{\"action\":\"GridLayer\",\"layer\":{\"label\":\"Grid\",\"onTop\":true,\"id\":\"Grid\",\"parent_id\":\"a8c46d33-af9b-4044-b1f1-7aedd50818c9\",\"visible\":true,\"labeled\":true,\"editable\":false,\"treeNodeType\":\"LAYER_GRID\"}}]},\"projection\":\"EPSG:4978\",\"state\":{\"reference\":\"EPSG:4978\",\"viewSize\":[1920,1021],\"transformation2D\":{\"worldOrigin\":[0,-0.000022660315882657555],\"viewOrigin\":[960,510.5],\"scale\":[0.00014706013564412014,0.00014706013564412014],\"rotation\":0},\"transformation3D\":{\"eyePointX\":12755302.578841701,\"eyePointY\":0,\"eyePointZ\":-111313.83923667668,\"yaw\":0,\"pitch\":-89.50167919412367,\"roll\":0}},\"workspaceExportOptions\":{\"saveAnnotations\":true,\"removeCredentials\":false}}",
                "filename": "test01.tws",
                "source": "file"
            }
        }
    }
}

export function RestoreWorkspaceBelgianFactoryCommand() {
    const FactoryWorkspaceContent = "{\"fileformat\":\"TridentWorkspace\",\"version\":\"1.0\",\"hidpi\":{\"snapToScaleLevels\":true,\"autoAdjustDisplayScale\":false},\"pictureSettings\":{\"saturation\":100,\"brightness\":100,\"contrast\":100,\"sepia\":0,\"grayscale\":0,\"invert\":0,\"enabled\":false},\"ecdisSettings\":{\"colorScheme\":\"day\",\"sounding\":false,\"displayCategory\":\"standard\",\"useTwoShades\":true,\"shallowContour\":2,\"safetyContour\":30,\"deepContour\":30,\"beam\":10,\"airDraft\":10,\"displayIsolatedDangersInShallowWater\":false,\"displayShallowPattern\":false,\"displaySoundings\":false},\"timeManager\":{\"range\":{\"min\":1707645469,\"max\":1707731869},\"interval\":{\"min\":1707685069,\"max\":1707692269},\"step\":1,\"currentTime\":1707688669},\"currentlayer\":\"dad5b28d-dd44-445b-814b-6d1a27c9179f\",\"layertree\":{\"action\":\"root\",\"layer\":{\"label\":\"root\",\"id\":\"612d58c6-4d24-45b0-a548-ea86390a6dac\",\"visible\":true,\"labeled\":true,\"treeNodeType\":\"LAYER_GROUP\"},\"nodes\":[{\"action\":\"TMSLayer\",\"layer\":{\"label\":\"OpenStreetMap\",\"id\":\"32229858-f289-4ccb-8f18-ad73c918f984\",\"parent_id\":\"612d58c6-4d24-45b0-a548-ea86390a6dac\",\"visible\":true,\"editable\":false,\"treeNodeType\":\"LAYER_RASTER\",\"detailFactorMultiplier\":1,\"detailFactor\":1},\"model\":{\"baseURL\":\"https://{s}.tile.openstreetmap.org/{z}/{x}/{-y}.png\",\"levelCount\":21,\"subdomains\":[\"a\",\"b\",\"c\"]}},{\"action\":\"BingmapsLayer\",\"layer\":{\"label\":\"Bingmaps satellite\",\"id\":\"15b7683d-2cc8-42d8-9d0f-508249816735\",\"parent_id\":\"612d58c6-4d24-45b0-a548-ea86390a6dac\",\"visible\":true,\"editable\":false,\"treeNodeType\":\"LAYER_RASTER\",\"detailFactorMultiplier\":1,\"detailFactor\":1},\"model\":{\"imagerySet\":\"Aerial\",\"useproxy\":true,\"requestParameters\":{\"dpi\":null}}},{\"action\":\"OGC3DTilesLayer\",\"layer\":{\"selectable\":true,\"transparency\":false,\"idProperty\":\"FeatureID\",\"loadingStrategy\":1,\"label\":\"/data/ogc3dtiles/outback_PBR_Draco\",\"offsetTerrain\":false,\"isDrapeTarget\":false,\"qualityFactor\":1,\"minScale\":null,\"maxScale\":null,\"visualProperties\":{\"currentFilter\":0,\"currentStyle\":0,\"filterActive\":false,\"filters\":[],\"scale\":{\"range\":{\"minimum\":0.4,\"maximum\":2},\"value\":1},\"styleActive\":false,\"styles\":[],\"type\":\"PointCloud\",\"pointSize\":{\"mode\":\"ADAPTIVE_WORLD_SIZE\",\"minimumPixelSize\":3,\"worldScale\":0.01},\"blending\":false,\"gapFill\":0,\"normalOriented\":true,\"pointShape\":\"DISC\"},\"meshStyle\":{\"lighting\":true,\"facetCulling\":0,\"pbrSettings\":{\"enabled\":false,\"imageBasedLighting\":true,\"directionalLighting\":true,\"lightIntensity\":0,\"material\":{\"metallicFactor\":1,\"roughnessFactor\":1}}},\"id\":\"dad5b28d-dd44-445b-814b-6d1a27c9179f\",\"parent_id\":\"612d58c6-4d24-45b0-a548-ea86390a6dac\",\"visible\":true,\"editable\":false,\"treeNodeType\":\"LAYER_OGC3D\"},\"model\":{\"url\":\"https://sampledata.luciad.com/data/ogc3dtiles/outback_PBR_Draco/tileset.json\",\"credentials\":false,\"requestHeaders\":{},\"requestParameters\":{},\"beforeProxy\":\"https://sampledata.luciad.com/data/ogc3dtiles/outback_PBR_Draco/tileset.json\",\"useProxy\":false}},{\"action\":\"GridLayer\",\"layer\":{\"label\":\"Grid\",\"onTop\":false,\"id\":\"Grid\",\"parent_id\":\"612d58c6-4d24-45b0-a548-ea86390a6dac\",\"visible\":true,\"labeled\":true,\"editable\":false,\"treeNodeType\":\"LAYER_GRID\"}}]},\"projection\":\"EPSG:4978\",\"state\":{\"reference\":\"EPSG:4978\",\"viewSize\":[1920,1021],\"transformation2D\":{\"worldOrigin\":[475278.16769707575,5683684.650227536],\"viewOrigin\":[960,510.5],\"scale\":[270.7418153029364,270.7418153029364],\"rotation\":293.16360356066275},\"transformation3D\":{\"eyePointX\":3986345.3000124437,\"eyePointY\":297616.8312329076,\"eyePointZ\":4953377.501001245,\"yaw\":293.1637843991428,\"pitch\":-10.516556768727384,\"roll\":359.99999914622634}},\"workspaceExportOptions\":{\"saveAnnotations\":true,\"removeCredentials\":false}}";
    return {
        "action": 3,
        "parameters": {
            "workspace": {
                "content": FactoryWorkspaceContent,
                "filename": "factory.tws",
                "source": "file"
            }
        }
    }
}


export function openWorkspaceFromDB(id: number) {
    ReadWorkspaceFromDB(id).then(workspace=>{
        window.catex.workspace.emitCommand({
            action: 3,
            parameters: {
                workspace: workspace
            }
        });
    })
}

function ReadWorkspaceFromDB(id: number) {
    return new Promise((resolve, reject)=>{
        // Location of the API for workspaces
        const url = `../api/user/workspaces/${id}`;
        fetch(url,
            {
                method:"GET",
                credentials: "include"
            }).then(response=> {
            if (response.ok) {
                response.json().then(workspace=>{
                    resolve(workspace);
                })
            }
        }).catch(()=>reject());
    });
}
