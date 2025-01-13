# CatalogExplorer Custom Extensions
## Triggering Commands

Catalog Explorer enables you to programmatically trigger commands. These commands consist of
instructions in JSON format that instruct Catalog Explorer on what actions to perform. You can emit
commands using the `workspace.emitCommand` hook.


### Procedure

Let's reuse the code we wrote in sample02

1. Copy the contents of the folder sample02 to sample03
2. Navigate to the sample03 folder and start the web server using:
```shell
serve public -C
```

3. Edit the content of index.js inside the public folder with the following content:

```JavaScript
window.catex = {
    app: {
        navbarActions: [{
            label: "Open TomTom layer ",
            title: "Open a TMS layer from the TomTom api",
            id: "uid01",
            action: (o, callback) => {
                window.catex.workspace.emitCommand(tomtomLayerCommand())
            }
        }]
    }
}

function tomtomLayerCommand() {
    const layerName = "basic";
    const tomtomkey = "api_key_placeholder";
    return {
        "action": 10,
        "parameters": {
            "action": "TMSLayer",
            "layer": {
                "label": `TomTom ${layerName}`
            },
            "model": {
                "baseURL": `https://{s}.api.tomtom.com/map/1/tile/${layerName}/main/{z}/{x}/{-y}.png?key=${tomtomkey}&tileSize=256`,
                "levelCount": 21,
                "subdomains": [ "a", "b", "c" ]
            }
        }
    }
}
```

4. Reload Catalog Explorer:

http://localhost:8080/catalogexplorer/home/

### Expected outcomes:
* Catalog Explorer and the custom extension load simultaneously.
* The Actions menu appears in the navbar.
* The entry "Open TomTom layer" is included in the Actions menu.
* Clicking on the menu item adds a new layer.

### Activity:
* Update the code to enable defining custom actions for opening the three layers supported by the
TomTom API. Create a unique custom action for each layer.

<strong>HINT:</strong> Include the layer name as a parameter in the function that generates the command. Refer to the
TomTom documentation for the available layer names:

https://developer.tomtom.com/map-display-api/documentation/raster/map-tile

Put all TomTom actions into a single submenu called TomTom.


### Optional Activity:
If you complete the initial task quickly, implement an additional custom action for restoring a workspace
from a JSON object.

<strong>HINT:</strong> Export your workspace to a file. Next, store the content as a JSON object that you can use from
your cod

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

