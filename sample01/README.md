# CatalogExplorer Custom Extensions
## My CDN first Application

This sample illustrates how to create your first Custom Extension.

This sample shows how to respond to mouse events happening on the main map

### Procedure

From the admin dashboard, accessed via the link:
<center>

[http://localhost:8080/catalogexplorer/admin](http://localhost:8080/catalogexplorer/admin)
</center>

Navigate to:
Custom Extensions -> Create & Edit
1. Click the “Add New” button.
2. Provide a name and a description.
3. Under “Source From,” choose CDN.
   "CDN" indicates that the code is stored on a separate web server.
   Enter the location of the JavaScript code. For this example, use:
```
   http://localhost:3000/index.js
```

   <strong>NOTE:</strong> This example serves our code using the NodeJS “serve” program, which is a NodeJS
   application available through npm. Ensure NodeJS is installed on your computer. If not, download
   and install it from the following URL:
<center>

   [https://nodejs.org/en/download/current](https://nodejs.org/en/download/current)
</center>

   Once NodeJS is installed, install the “serve” package globally using npm:
```shell
   npm install -g serve
```
4. Create a folder called sample01. Inside it, create another folder called public to store your custom
   extension:
```shell
mkdir public
```
5. Navigate to the sample01 folder and start the web server using:
```shell
serve public -C
```
   
<strong>HINT:</strong> The -C flag is important as it enables CORS, allowing the loading of code from a remote site.


6. Create a file named index.js inside the public folder with the following content:


```JavaScript
window.catex = {
    map: {
        onMouseClick:[
            {
                action: function(o, callback) {
                    console.log("Mouse click on map from Custom Extension CDN!!:", o);
                }
            },
        ]
    }
}
```

7. Assign the newly create custom extension to Test Profile.
8. Assign the Role “ROLE_CUSTOM_EXTENSIONS_TESTER” to the administrator user and login in as
   admin.

<center>

[http://localhost:8080/catalogexplorer/home/](http://localhost:8080/catalogexplorer/home/)
</center>

### Expected results:
   * Catalog Explorer loads alongside the custom extension.
   * The custom extension code is executed upon mouse click.
   * Open the Developer Tools and confirm that the custom extension is loaded.
   * Check the console to ensure that a message is printed every time the mouse is clicked on the
   map.
### Activity:
   Create actions for map.onMapMove and map.onMousePoint that print the message received to the
   screen.

<strong>Hint:<strong> You can always refer to the Typescript file “Catext.ts” to see the definition of the methods the syntax
   and parameters received and returned.

<strong>Hint:<strong> map.onMapMove and map.onMousePoint are very similar to map.onMouseClick. You could
   simply copy and paste the code and adapt the code to your needs.


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

