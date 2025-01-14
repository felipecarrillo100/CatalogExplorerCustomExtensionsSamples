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
3. Under `Source From` choose `Local`.
   * “Local” means the code for the Custom Extension is stored locally in the Catalog Explorer
     Database.
   * “CND” means the code is stored on a separate web server.
     For the first example we will provide the code directly in the database.

4. For thia example we will provide the code directly in the database.
   Copy & paste the following code snippet in the JavaScript editor tab:

```JavaScript
// Image encoded in base4
const logoBase64 = "data:image/jpeg;base64,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";

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

5. Copy & paste the following code snippet in the CSS editor tab:
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

6. Assign the newly create custom extension to Test Profile.
7. Assign the Role “ROLE_CUSTOM_EXTENSIONS_TESTER” to the administrator user and login in as
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
<strong>Hint:</strong> Go to the JavaScript Editor tab  and change the source of the logo. If you don't know how to encode an image in base64 you can easily convert any image at the following website
https://www.base64-image.de/
