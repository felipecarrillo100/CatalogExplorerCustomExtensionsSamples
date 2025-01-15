# CatalogExplorer Custom Extensions
## Creating forms with JSON schema

Frequently, your application will need to request data from the user. This could include reading values
used in computations, such as strings, numbers, URLs, colors, dates, files, and more. Catalog Explorer
Custom Extension offers a user-friendly method to create forms ranging from simple to complex data
structures.

You can create your own form easily and quick by defining your form using JSON Schema. This is
standard format well documented and well stablished in the market. You can find more information here:

https://json-schema.org/

We will not give you an extensive training about JSON schema, but instead you can use one of the online
playgrounds where you can evaluate your form. In particular this playground is 99% compatible with the

Catalog Explorer implementation:

https://rjsf-team.github.io/react-jsonschema-form/

In this exercise you will create a form that request last name, first name, age, and salary band.


### Procedure

Let's reuse the code we wrote in sample06

1. Copy the contents of the folder sample06 to sample08
2. Navigate to the sample08 folder and start the web server using:
```shell
serve public -C
```
3. Edit the content of index.js inside the public folder with the following content:

```javascript
window.catex = {
    app: {
        navbarActions: [{
            label: "About you",
            title: "Demo of JSON Schema capabilities",
            id: "uid011",
            action: (o, callback) => {
                MyJSONSchemademo();
            }
        }, ]
    },
}

function MyJSONSchemademo() {
    window.catex.workspace.createJSONSchemaForm(aboutYouForm(), {
        onChange: (data) => {
            // Not used in this sample
        },
        onCancel: () => {
            console.log("Cancel");
            window.catex.workspace.toastMessage({
                message: "Command canceled",
                type: "warning"
            })
        },
        onSuccess: (formData) => {
            console.log("Success", JSON.stringify(formData, null, 2));
            window.catex.workspace.toastMessage({
                message: "Command submitted",
                type: "info"
            })
        }
    })
}

function aboutYouForm() {
    return {
        schema: {
            "type": "object",
            "title": "About you",
            "properties": {
                "Lastname": {
                    "title": "Enter your lastname",
                    "type": "string"
                },
                "Firstname": {
                    "title": "Enter your firstname",
                    "type": "string"
                },
                "Age": {
                    "title": "Enter your age",
                    "type": "number",
                    "minimum": 18,
                    "maximum": 100,
                },
                "SalaryBand": {
                    "title": "Salary band",
                    "type": "integer",
                    "minimum": 0,
                    "maximum": 100000,
                    "multipleOf": 10000
                }
            }
        },
        uiSchema: {
            "Age": {
                "ui:widget": "updown"
            },
            "SalaryBand": {
                "ui:widget": "range",
                'ui:options': {
                    inputType: 'range',
                },
            }
        },
        formData: {
            Age: 18,
        }
    }
}
```
5. Reload Catalog Explorer:

http://localhost:8080/catalogexplorer/home/

6. Go to menu action and click on “About you”
7. Fill in the form with your data

### Expected outcomes:
* Catalog Explorer loads together with the custom extension.
* Actions has an “About you” menu entry
* If you submit the form the values entered are printed in the console.

### Activity:
* Create your own forms using JSON Schema. Try adding some widgets
* Create forms using JSON Schema that inputs geometries 

### Optional activity
Create a form using JSON Schema that looks searches for points of interest in the area currently visible in the map. 

The form must limit the search to the following points ["hospitals", "police", "airports", "firefighters", "gas station", "train"]

<strong>Hint:</strong> You can reuse code from sample05 and modify your API for POI search to use the parameters `topLeft` and `btmRight` as defined in the documentation:

https://developer.tomtom.com/search-api/documentation/search-service/points-of-interest-search


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

