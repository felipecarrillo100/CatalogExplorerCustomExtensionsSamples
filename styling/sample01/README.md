# CatalogExplorer Custom Extensions
## Apply your own style using CDN

This sample illustrates you can change the colors and logo of Catalog Explorer using Custom Extensions.
This sample will use a CDN approach


### Procedure

From the admin dashboard, accessed via the link:

http://localhost:8080/catalogexplorer/admin

Navigate to:
Custom Extensions -> Create & Edit
1. Click the `Add New` button.
2. Provide a name and a description.
3. Under `Source From` choose `CDN`.
   `CDN` indicates that the code is stored on a separate web server.

   Enter the location of the JavaScript code. For this example, use:
```
   http://localhost:3000/index.js
```
Enter the location of the CSS code. For this example, use:
```
   http://localhost:3000/index.css
```

   <strong>NOTE:</strong> This example serves our code using the NodeJS “serve” program, which is a NodeJS
   application available through npm. Ensure NodeJS is installed on your computer. If not, download
   and install it from the following URL:

https://nodejs.org/en/download/current

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
// Image served from a specific URL location
const logoUrl = "http://localhost:3000/new_logo.png";

window.catex = {
   app: {
      onAppReady: ()=> {
         const logoElement = document.querySelector("img.navbar-brandIcon");
         if (logoElement && logoElement.tagName === 'IMG') {
            logoElement.src = logoUrl;
         }
      },
   }
}
```

7. Create a file named index.css inside the public folder with the following content:

```css
:root {
   --color-primary: #590120;
   --color-primary-lighter-15: color-mix(in srgb,var(--color-primary),#fff 15%);
   --color-primary-darker-15:  color-mix(in srgb,var(--color-primary),#000 15%);
   --color-primary-darkest-30: color-mix(in srgb,var(--color-primary),#000 30%);
   --color-primary-darkest-45: color-mix(in srgb,var(--color-primary),#000 45%);
   --color-primary-darkest-60: color-mix(in srgb,var(--color-primary),#000 60%);
   --background: var(--color-primary);
   --background-gradient-image:linear-gradient(var(--color-primary), var(--color-primary-darker-15) 40%, var(--color-primary-darkest-30));
   --background-gradient-darker-image:linear-gradient(var(--color-primary-darker-15), var(--color-primary-darkest-30) 40%, var(--color-primary-darkest-45));
   --background-gradient-darkest-image:linear-gradient(var(--color-primary-darkest-30), var(--color-primary-darkest-45) 40%, var(--color-primary-darkest-60));
   --text-light: #ffffff;
}

/* Navbar */
.main-navbar{
   --bs-bg-opacity: 1;
   background-color: var(--background) !important;
}

.nav-link {
   color: var(--text-light);
}

.navbar-collapse .dropdown-menu a {
   font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
   font-size: 14px;
   color: var(--text-light);
   line-height: 20px;
}

.dropdown-menu {
   --bs-dropdown-bg: var(--background);
}

.navbar.bg-dark .nav-link:hover {
   background-image: var(--background-gradient-image)
}

/* Floating Windows */
.floating-window .floating-window-title {
   background-color: var(--background);
   background-image: var(--background-gradient-image)
}

/* Side Panels Windows */
.SlidingPanel-header {
   background-color: var(--background);
   background-image: var(--background-gradient-image);
}

/* Tab Panels Windows */
.tabpanel-content-header {
   background-color: var(--background);
   background-image: var(--background-gradient-image);
}

.tabpanel-tab-item.selected {
   background-color: var(--background);
   background-image: var(--background-gradient-image);
}

.tabpanel-tab-item:hover, .tabpanel-tab-item.selected:hover {
   background-color: var(--background);
   background-image: var(--color-primary-darker-15);
}

/* Map Overlay Toggle Buttons */
.overlay-modular-container-toggle-button {
   background-image: var(--background-gradient-image);
}
.overlay-modular-container-toggle-button:hover {
   background-image: var(--background-gradient-darkest-image);
}
.overlay-modular-container-toggle-button.dark {
   background-image: var(--background-gradient-darkest-image);
}
.overlay-modular-container-toggle-button.dark:hover {
   background-image: var(--background-gradient-darker-image);
}

/* Toggle 2F/3D button */
.toggle-button {
   background-image: var(--background-gradient-image);
}

.toggle-button:hover {
   background-image: var(--background-gradient-darker-image);
}

.toggle-button:active {
   background-image: var(--background-gradient-darkest-image);
}

/* Catalog /Edit / Measure Buttons */
.Catalog-Tools-Button.active {
   background-image: var(--background-gradient-image);
   color: #c8c8c8;
}

.Catalog-Tools-Button :hover {
   background-image: var(--background-gradient-darker-image);
   color: #c8c8c8;
}

/*.Measure-Tools-Button*/
.Measure-Tools-Button.selected {
   background-image: var(--background-gradient-image);
   color: rgb(200, 200, 200);
}

.Measure-Tools-Button :hover{
   background-image: var(--background-gradient-darker-image);
   color: rgb(200, 200, 200);
}

.Measure-Tools-Button.selected :hover {
   background-image: var(--background-gradient-darker-image);
}

/*.Edit-Tools-Button*/
.Edit-Tools-Button.selected {
   background-image: var(--background-gradient-image);
   color: rgb(200, 200, 200);
}

.Edit-Tools-Button :hover{
   background-image: var(--background-gradient-darker-image);
   color: rgb(200, 200, 200);
}

.Edit-Tools-Button.selected :hover {
   background-image: var(--background-gradient-darker-image);
}

/* Time Control */

.map-time-window .time-slider-toolbar .Time-Line-Top-Button {
   border: 1px solid var(--color-primary);
   color: var(--color-primary);
}

.map-time-window .time-slider-container .Time-Line-Top-Button:hover, .map-time-window .time-slider-container .Time-Line-Top-Button {
   border: 1px solid var(--color-primary);
   color: var(--color-primary);
}

.map-time-window .time-slider-toolbar .Time-Line-Top-Select-SPEED {
   border: 1px solid var(--color-primary);
   color: var(--color-primary);
}

.map-time-window .time-slider-toolbar .Time-Line-Top-Select-BASETIME:hover, .map-time-window .time-slider-toolbar .Time-Line-Top-Select-BASETIME:focus {
   border: 1px solid var(--color-primary);
   color: var(--color-primary);
}

.map-time-window .time-slider-toolbar .Time-Line-Top-Select-BASETIME, .map-time-window .time-slider-toolbar .Time-Line-Top-Select-BASETIME {
   border: 1px solid var(--color-primary);
   color: var(--color-primary);
}


/* Compass */
.compass .compassDisplay .north {
   border-bottom: 12px solid color-mix(in srgb, var(--color-primary) 50%, transparent);
}

.compass:hover {
   color: var(--color-primary);
   background-color: #242c3a;
}

.compass:hover .compassIconContainer .compassIcon {
   color: var(--color-primary);
}

.compass:hover .compassDisplay .north {
   border-bottom-color: color-mix(in srgb, var(--color-primary) 50%, transparent);
}

.compass .compassDisplay .north:hover {
   border-bottom-color: color-mix(in srgb, var(--color-primary) 100%, transparent);
}

/* zoom control */
.zoomcontrol:hover input[type=range]::-webkit-slider-thumb {
   background: var(--color-primary);
}

.zoomcontrol:hover input[type=range]::-moz-range-thumb {
   background: var(--color-primary);
}

.zoomcontrol:hover input[type=range]::-ms-thumb {
   background: var(--color-primary);
}

/* pancontrol */
.pancontrol:hover {
   color:var(--color-primary);
}

.pancontrol .ctrl:hover .ball {
   background: var(--background-gradient-image)
}

/* Layer Control */
.layer-manager-span:hover, .layer-manager-span.active:hover {
   background-color: var(--color-primary);
}
.layer-manager-span.active{
   background-color: var(--color-primary-darker-15);
}

/* Searchbox */

.searchbox-container .search-box__control.search-box__control--is-focused {
   border-color: var(--color-primary);
   box-shadow: 0 0 0 1px var(--color-primary);
}

.searchbox-container .spatial-search-button {
   background-image: var(--background-gradient-image);
}

.searchbox-container .spatial-search-button:hover {
   background-image: var(--background-gradient-darker-image);
}

.searchbox-container .spatial-search-button:active {
   background-image: var(--background-gradient-darkest-image);
}

.searchbox-container .search-box__menu .search-box__option--is-focused {
   /*background-color: var(--color-primary);*/
   background-color: var(--color-primary-lighter-15);
}
```

8. Assign the newly create custom extension to Test Profile.
9. Assign the Role “ROLE_CUSTOM_EXTENSIONS_TESTER” to the administrator user and login in as
   admin.

http://localhost:8080/catalogexplorer/home/

### Expected results:
   * Catalog Explorer loads alongside the custom extension.
   * The colors of Catalog Explorer have changed.
   * The Logo of Catalog Explorer has changed

### Activity:
   Change the colors of Catalog Explorer to the colors of your choice

<strong>Hint:</strong> You can easily change the color modifying the variable `--color-primary` in `:root`

Change the logo of Catalog Explorer for one of your choice.

<strong>Hint:</strong> Edit index.js and change the url of the logo

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

