# CatalogExplorer Custom Extension with Webpack, Typescript and React

This sample illustrates functionalities currently supported by Catalog Explorer Custom extension.

Catalog Explorer Custom extension expects one Javascript file and one CSS file.  You can use webpack to bundle multiple files.

This is useful when you have a large project that may consist of multiple files and 3rd party packages.

This code is writen in Typescript but and it uses Webpack to bunbdle the source code to a Javascript file. 


## To install
```
npm install
```

## To debug
```
npm start
```

## To Build
```
npm run build
```

Once you have generated your bundle you can coopy the files to any webserver and serve them from there.

## To test production build
```
npm run serve
```

Once running you need to configure CatalogExplorer custom extensions to retrive the Javascript and CSS from these locations:

JavaScript (CDN):
```
http://localhost:5000/index.js
```

CSS (CDN):
```
http://localhost:5000/index.css
```

