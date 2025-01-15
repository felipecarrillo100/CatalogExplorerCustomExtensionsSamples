# CatalogExplorer Custom Extensions
# Custom Extension using React

React Is a framework, easy to learn and use. It is also easy to integrate in our projects with a minimal
knowledge of JavaScript. React allow us to build a rich UI with must less effort than traditional JavaScript
code. React allow us to split our UI into custom modular components similar to existing HTML tags. Not to
mention that there are hundreds of libraries already available that provide modular React-components that
you can incorporate directly into your application with little intrusion to your code design.

Once you have Webpack in place adding React is quite simple. We only need to modify our webpack
configuration to add a React loader and include the React libraries as a dependency in our package.json. You can use the provided `webpack.config.js` as a reference.

The intention of this training is not to make you a React expert; therefore, we will provide you with the
code required for this exercise. But you can of course experiment yourself and try your own ideas on top
of the code provided. Instead, in this exercise we will focus on how to use react in combination with
catalog explorer. And for that you need to know the following concepts.

### Root DOM element
React normally needs a root HTML DOM element to where you can attach your code. For this, Catalog
explorer provides a div element with id=”document-companion.” You can use this element as root of your
application. How to do this, depends on your react version, in React 18 it looks something like this:
```javascript
const root = ReactDOM.createRoot(document.getElementById("documentcompanion"));
root.render(<App/>);
```
Where App is the main React component of your application. In the code of this example our App
component is not doing much, but you can use this component to place component on top of Catalog
Explorer according to your needs.
### Dynamic form DOM element
The root element is certainly an option you have, but when you create react components using the root
element you risk the fact that your code may look a bit disconnected from the rest of the Catalog Explorer
environment. Or you will be forced to write much more code to achieve a good level of integration. To
overcome those problems, we provide you the possibility of adding your react code on top of a Dynamic
DOM element that lives inside a catalog explorer side panel, and it is integrated to the innerworkings of
Catalog Explore, therefore simplifying the integration of your code with the rest of the application.

To create a form using React in one of the react side panels you will use something like this:
```javascript
window.catex.workspace.createCustomForm((element, handlers)=>{
    const root = ReactDOM.createRoot(element);
    root.render(<CreateCircleForm handlers={handlers} />);
}, options);
```
As you see, the window.catex.workspace.createCustomForm will pass the DOM element to use as a
parameter to the callback function. and the call back function will take care of rendering the react
component inside the DOM element. The handlers required for integration will be passed as a property to
our react component. The options object is a configuration object that defines options such as the title to
use for the form or the panel to use for display and whether you want to show cancel and submit buttons
in the form

## Procedure
1. Go to folder sample10. You will notice already contains a webpack project defined in
   `webpack.config.js` which contains all the required settings including React.
2. Typescript has also been configured as you seen in the file `tsconfig.json`, You will notice also that the
   folder called `interfaces` contains the file `catex.ts` will all the type definitions required by Custom
   Extensions
3. Basic linting has also been configured to use React (optional) `eslintrc.js`
4. To run this project type
```shell
   npm install
```
5. To run this project in development mode type
```shell
   npm start
```
6. The webpack development server is configured to serve at `localhost:5000`, go to the Catalog Explorer
   administration dashboard and configure it to look for the custom extension at:
   * JavaScript: http://localhost:5000/index.js
   * CSS: http://localhost:5000/index.css
7. Reload Catalog Explorer and verify that Catalog Explorer and the custom extension are both loaded
   simultaneously.
8. Verify that you can debug the code in Typescript in your web browser.
9. Build for production. To build for production simply run the script.


## Activity
Run webpack in development mode and make some changes, for instance add a new action that displays
a form using React. Place the code of your action in a separate file to test the modularity. 

Add a third-party library of your choice to your project using `npm install`. In this example we have included two
third-party libraries: recharts and polygons-generator

<strong>HINT:</strong> The main file (entry point) is located at “src/index.tsx“. You could place your custom extension code
directly here, but for modularity, we recommend placing it in separate files. Notice
also that as react development states, any code that files that contain react rendering code needs to have
`jsx/tsx` extension.


# Run Solution

## To install
```
npm install
```

## To debug
```
npm start
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


## To Build
```
npm run build
```

Once you have generated your bundle you can copy the files to any webserver and serve them from there.

## To test production build
```
npm run serve
```

