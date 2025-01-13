# CatalogExplorer Custom Extensions
## My first Application

This sample illustrates how to create your first Custom Extension.

This sample shows how to respond to mouse events happening on the main map

### Procedure

From the admin dashboard, accessed via the link:

http://localhost:8080/catalogexplorer/admin

Navigate to:
Custom Extensions -> Create & Edit
1. Click the “Add New” button.
2. Provide a name and a description.
3. Under “Source From,” choose Local.
   * “Local” means the code for the Custom Extension is stored locally in the Catalog Explorer
   Database.
   * “CND” means the code is stored on a separate web server.
   For the first example we will provide the code directly in the database.
   
4. Copy & paste the following code snippet:

```JavaScript
window.catex = {
    map: {
        onMouseClick:[
            {
                action: function(o, callback) {
                    console.log("Mouse click on map from Custom Extension!!:", o);
                }
            },
        ]
    }
}
```

5. Assign the newly create custom extension to Test Profile.
6. Assign the Role “ROLE_CUSTOM_EXTENSIONS_TESTER” to the administrator user and login in as
   admin.

http://localhost:8080/catalogexplorer/home/

### Expected results:
   * Catalog Explorer loads alongside the custom extension.
   * The custom extension code is executed upon mouse click.
   * Open the Developer Tools and confirm that the custom extension is loaded.
   * Check the console to ensure that a message is printed every time the mouse is clicked on the map.
### Activity:
   Create actions for map.onMapMove and map.onMousePoint that print the message received to the
   screen.

<strong>Hint:</strong> You can always refer to the Typescript file “Catext.ts” to see the definition of the methods the syntax and parameters received and returned.

<strong>Hint:</strong> map.onMapMove and map.onMousePoint are very similar to map.onMouseClick. You could simply copy and paste the code and adapt the code to your needs.


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

