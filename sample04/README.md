# CatalogExplorer Custom Extensions
## Adding Custom Actions on Feature Layers

You have the option to define actions that are activated when specific features of a feature layer or an
OGC 3D Tiles layer (that supports features) are selected. To facilitate this, the following hooks are
available:
* featureLayer.onFeatureSelect
* featureLayer.onMultiFeatureSelect
* ogc3dTiles.onFeatureSelect
* ogc3dTiles.onMultiFeatureSelect

In this exercise, we’ll implement actions for both single and multiple feature selections. Both
`featureLayer.onFeatureSelect` and `featureLayer.onMultiFeatureSelect` are arrays where you can define
actions, as shown in the following example.

### Procedure

Let's reuse the code we wrote in sample03

1. Copy the contents of the folder sample03 to sample04
2. Navigate to the sample04 folder and start the web server using:
```shell
serve public -C
```

3. Edit the content of index.js inside the public folder with the following content:

```JavaScript
window.catex = {
    featureLayer: {
        onFeatureSelect: [{
            label: "Show single selected feature",
            title: "Hint for single selected feature",
            action: (parameters, callback) => {
                console.log(parameters)
            }
        }],
        onMultiFeatureSelect: [{
            label: "Show multiple selected features",
            title: "Hint for multiple selected features",
            action: (parameters, callback) => {
                console.log(parameters)
            }
        }]
    }
}
```
4. Reload Catalog Explorer:

http://localhost:8080/catalogexplorer/home/

5. Open a WFS layer, for instance:

https://sampleservices.luciad.com/wfs

6. Open the layer City 125.
7. Select and right-click on one city.


### Expected outcomes:
* Catalog Explorer loads along with the custom extension.
* Right-clicking on a feature triggers the appearance of a context menu.
* The context menu includes the actions you’ve defined.
* Upon clicking an action menu item, your custom action will be executed.

### Activity:
* Expand the array by adding more elements to introduce new actions for both single and multi-select
scenarios. In these new elements, utilize the action callback parameter to display a JSON object in a
balloon.

### Optional Activity:
If you complete the exercise early, repeat the same process for:
* ogc3dTiles.onFeatureSelect
* ogc3dTiles.onMultiFeatureSelect

Open a Mesh layer (OGC 3D tiles layer), select one or more features, and right-click on a feature of the
mesh layer.

<strong>HINT:</strong> You can utilize the ogc3dTiles layer that contains features:

https://sampledata.luciad.com/data/ogc3dtiles/outback_PBR_Draco/tileset.json


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

