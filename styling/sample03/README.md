# CatalogExplorer Custom Extension with Webpack, Typescript and React

This sample illustrates functionalities currently supported by Catalog Explorer Custom extension.

Catalog Explorer Custom extension expects one Javascript file and one CSS file.  You can use webpack to bundle multiple files of multiple types, including images.

This is useful when you have a large project that may consist of multiple files and 3rd party packages.

This code is writen in Typescript but and it uses Webpack to bunbdle the source code to a Javascript file. 

<strong>Note:</strong> Notice that in this example use use an image in png format. You can deal with this in several ways, for instance such image could be located on a external URL from which it is served.  However, if we want to serve such an application in our database without the need of external links it makes sense to bundle the image inside the javascript file.  For this we use the webpack loader url-loader that will load the image using import and encode it  in base64.
```javascript
import logo from "./resources/images/R-evolution_logo_web_136px.png";
```

Of course for this you need to properly configure your `webpack.config.js` to use the url-loader. This is something like this:
```javascript
[
    ...otherLoaders,
    {
        // Assets loader
        // More information here https://webpack.js.org/guides/asset-modules/
        test: /\.(gif|jpe?g|tiff|png|webp|bmp|svg|xml)$/i,
        use: [
            { loader: 'url-loader' },
        ],
    },
]
```
<strong>Note:</strong> In the example above all images (gif, jpeg, png, tiff, webp, bmp, svg) are encoded in base64 format 



## To install
```
npm install
```

## To debug
```
npm start
```

Once running you need to configure CatalogExplorer custom extensions to retrieve the Javascript and CSS from these locations:

JavaScript (CDN):
```
http://localhost:5000/index.js
```

CSS (CDN):
```
http://localhost:5000/index.css
```

<strong>Hint:</strong> Verify that both URLs are reachable in the browser. 

## To Build
```
npm run build
```

Once you have generated your bundle you can copy the files to any webserver and serve them from there.

## To test production build
```
npm run serve
```


