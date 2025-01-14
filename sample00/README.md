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
3. Under `Source From` choose `Local`.
   * “Local” means the code for the Custom Extension is stored locally in the Catalog Explorer
   Database.
   * “CND” means the code is stored on a separate web server.
   For the first example we will provide the code directly in the database.
   
4. For the first example we will provide the code directly in the database.
   Copy & paste the following code snippet in the JavaScript editor:

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
