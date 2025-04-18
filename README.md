# Catalog Explorer 
## Custom Extensions Samples

This project provides a hands-on tutorial to develop Custom Extensions for Catalog Explorer.

## Scope
These training exercises provide an introduction to Custom Extensions, a feature of Catalog Explorer designed to enhance user capabilities. With Custom Extensions, users can execute personalized JavaScript code in response to events occurring within Catalog Explorer. This powerful feature enables users to extend the functionality of Catalog Explorer, facilitating integration with external REST APIs or proprietary backend systems.

Throughout this course, participants will gain a comprehensive understanding of how to effectively leverage Custom Extensions to augment the existing suite of features within Catalog Explorer.

### Target audience
This training program is designed for the following audiences:

* Developers seeking to incorporate customized features into Catalog Explorer.
* Presales professionals aiming to gain a comprehensive understanding of the capabilities offered by Custom Extensions.

NOTE: Main folder `sample00` to `sample12` focus on JavaScript development, while samples in the `styling` folder focus on CSS styling and branding.


### Objectives
By the end of this training, you will be able to:
* Create a new custom extension.
* Add new actions to the navigation bar.
* Open layers programmatically.
* Integrate with external APIs.
* Connect to a custom backend.
* Add custom forms.
* Development Custom Extension with Webpack and React.
* Apply custom styling with CSS.

## Installation

To be able to execute this samples you will require a copy of Catalog Explorer. You can get a Docker version of Catalog Explorer or you can deploy it manually.

### Docker version 
To run the docker version, simply go to the folder containing the `docker-compose.yml` and type:

```shell
docker compose up
```

Now you are ready to go. You can skip the `Manual deployment` section

### Manual deployment 
If you decide not to use docker then you will need to manually install all the dependencies (Postgres, Java, Tomcat).

Follow these steps to configure a standalone instance of Catalog Explorer.

1. Deploy Postgres
   * If you don’t have Postgres installed, download it from this link:
   https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
   * Recommended version: 15.5 (use Postgres 10 or higher).
   * Configure Postgres using pgAdmin.
   * Create a Postgres User named "trident" with login privileges:
     * Username: `trident`
     * Password: `trident` 
   * Create a database named `tridentdb9` and set the owner as user `trident`.
2. Install Java VM
   * Download the latest version of OpenJDK from: https://jdk.java.net/archive/
   * Install OpenJDK 11 or higher (OpenJDK 17 recommended). Unzip the downloaded file in your
   preferred location, usually: `C:\Program Files\Java\`.
3. Install Tomcat 10
   * Download Tomcat 10 from: https://tomcat.apache.org/download-10.cgi
   * Note: Catalog Explorer requires Tomcat 10.
   * Use the Windows Service Installer for installation.
   * Create an Administrator user and save your username and password for step 4.
   * Hint: During installation, specify the Java OpenJDK installation path from step 2.
   * Verify Tomcat is running by accessing the Tomcat Web UI at: http://localhost:8080/
   * If you intend to utilize the multi-language support feature, ensure that you enable it in your Java
options. To do this, add: `-Dfile.encoding=utf-8`
   
4. Deploy Catalog Explorer in Tomcat

   * Download the Catalog Explorer WAR file provided during training.
   * Copy the WAR file to: `C:\Program Files\Apache Software Foundation\Tomcat 9.0\webapps`
   * Log in to Tomcat Web UI using the credentials created in step 3 and start the Catalog Explorer
   service.
   * Access Catalog Explorer via: 
   http://localhost:8080/manager/html
   
   * Wait for Catalog Explorer to load, then log in using: 
   http://localhost:8080/catalogexplorer

## Exploring Catalog Explorer

In this training, we will start by familiarizing ourselves with some of the key features of Catalog Explorer. 
To begin, please log in to Catalog Explorer using the following link in your web browser::

http://localhost:8080/catalogexplorer

NOTE: The default username and password are `admin` / `adminPass`.

1. From the Preferences menu:
   * a. Set default projection to 3d.
   * b. Set your preferred units (meters/miles).
   * c. Set your preferred language.
   Hint: Click on `Save changes` to make your changes permanent.
2. From the Data menu, add some new layers:
   * a. Add a WMS layer:
```
https://sampleservices.luciad.com/wms
``` 
   * b. Add a WFS layer: 
```
https://sampleservices.luciad.com/wfs
```
   * c. Add a TMS Layer: 
```
https://{s}.tile.openstreetmap.org/{z}/{x}/{-y}.png
```    
   * Another example of TMS
```
https://{s}.api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{-y}.png?key=A9R38rS8rPA6NS1ARfwn24mgEMlCCQ9k&tileSize=256
``` 
   For more info about the TomTom service, go to:

https://developer.tomtom.com/map-display-api/documentation/raster/map-tile

* d. Add a 3dTiles layer:
```
https://sampleservices.luciad.com/ogc/3dtiles/outback/tileset.json
```
* e. Add a Panorama:
```
https://sampledata.luciad.com/data/panoramics/LucernePegasus/cubemap_final.json
```
* f. Add a mesh:
```
https://sampledata.luciad.com/data/ogc3dtiles/LucerneAirborneMesh/tileset.json
```
* Another mesh example:
```
https://sampledata.luciad.com/data/ogc3dtiles/outback_PBR_Draco/tileset.json
```
* g. Add a GeoJSON file:
```
https://raw.githubusercontent.com/felipecarrillo100/geojsonrepo/master/world.json
```

Hint: Click the `Get layers` button to retrieve information from the URL. Once retrieved, select
your preferences, and then click “Add layer” to incorporate the layer into the map.

3. Save all your layers into a workspace.

   Hint: Your account menu is situated in the top right corner. From there, navigate to `Workspace` ->
   `Save As`, and provide a name and description for your workspace.

4. Go to the admin dashboard using the top right corner menu or use this URL:

   http://localhost:8080/catalogexplorer/admin

   Set your Bing maps token from `Settings`->`Third-Party Service Providers`->`Bing maps Key`
   Hint: You can learn more about how to acquire a Bing maps key at this website:

   https://learn.microsoft.com/en-us/bingmaps/getting-started/bing-maps-dev-center-help/getting-a-bing-maps-key

## Catalog Explorer Architecture
The Catalog Explorer user interface comprises a series of components arranged hierarchically, structured
as follows:
1. At the top level, there is the application itself, Catalog Explorer.
2. Within the application, you’ll find a navigation bar (navbar) and a workspace.
3. The workspace houses a map.
4. Within the map, there are various layers.


The Catalog Explorer user interface operates based on commands. Communication between different
elements occurs by sending commands, which are first directed to the Application, then to the

Workspace, and finally to the Map. These commands can be triggered from the Navbar, a form, or
programmatically from your custom extension.

Instead of providing an extensive list of available commands, we offer a debug mode that prints the
commands to the console. To activate debug mode, simply add `debug=true` to the URL as a query
parameter. For this exercise, use the following URL to enter debug mode:

http://localhost:8080/catalogexplorer/home/?debug=true

Now, try adding some layers or loading workspaces. Then, check the console for the commands.

<strong>Hint:</strong> The command is essentially a JSON object that begins with the property `Action`. For example,
setting `Action=10` corresponds to creating a layer, while setting `Action=3` corresponds to restoring a
workspace. Instead of memorizing commands, you can utilize the debug mode to generate commands
that you can later replay in your `Custom Extensions` by copying and pasting the command, editing it as
necessary
