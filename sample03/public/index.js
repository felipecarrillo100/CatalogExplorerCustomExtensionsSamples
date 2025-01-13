window.catex = {
    app: {
        navbarActions: [
            {
                label: "Tomtom layers",
                title: "Open tom tom layers",
                id: "uid-sub01",
                children: [
                    {
                        label: "Open Tomtom layer basic",
                        title: "Open a TMS layer from the tomtom api",
                        id: "uid01",
                        action: (o, callback)=>{
                            window.catex.workspace.emitCommand(tomtomLayerCommand("basic"))
                        }
                    },
                    {
                        label: "Open Tomtom layer hybrid",
                        title: "Open a TMS layer from the tomtom api",
                        id: "uid02",
                        action: (o, callback)=>{
                            window.catex.workspace.emitCommand(tomtomLayerCommand("hybrid"))
                        }
                    },
                    {
                        label: "Open Tomtom layer labels",
                        title: "Open a TMS layer from the tomtom api",
                        id: "uid03",
                        action: (o, callback)=>{
                            window.catex.workspace.emitCommand(tomtomLayerCommand("labels"))
                        }
                    },
                ]
            },
            {
                label: "Open Workspace",
                title: "Open a Wokspace",
                id: "uid011",
                action: (o, callback)=>{
                    window.catex.workspace.emitCommand(RestoreWorkspace())
                }
            },
        ]
    }
}

function tomtomLayerCommand(layerName)  {
    const tomtomkey = "A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k";
    return {
        "action": 10,
        "parameters": {
            "action": "TMSLayer",
            "layer": {
                "label": `Tomtom ${layerName}`,
            },
            "model": {
                "baseURL": `https://{s}.api.tomtom.com/map/1/tile/${layerName}/main/{z}/{x}/{-y}.png?key=${tomtomkey}&tileSize=256`,
                "levelCount": 21,
                "subdomains": [
                    "a",
                    "b",
                    "c"
                ]
            }
        }
    }
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
