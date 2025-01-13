# CatalogExplorer Custom Extensions
##  Adding Custom Actions

Catalog Explorer offers a navbar from which actions can be triggered. Custom Extensions enables you to
create your own actions for the navbar. To achieve this, you can utilize the `app.navbarActions`
array. Adding actions to the navbar is as simple as appending new elements to the
`app.navbarActions` array.


### Procedure

From the admin dashboard, accessed via the link:

http://localhost:8080/catalogexplorer/admin

Navigate to:
Custom Extensions -> Create & Edit
1. Copy the contents of the folder sample01 to sample02.
2. Navigate to the sample02 folder and start the web server using:
```shell
serve public -C
```

<strong>HINT:</strong> The -C flag is important as it enables CORS, allowing the loading of code from a remote site.


3. Edit the content of index.js inside the public folder with the following content:

```JavaScript
window.catex = {
    app: {
        navbarActions: [
            {
                label: "Trigger action 1",
                title: "Action 1",
                id: "uid01",
                action: (o, callback) => {
                    alert("Action one triggered!")
                }
            },
            {
                label: "Trigger action 2",
                title: "Action 2",
                id: "uid02",
                action: (o, callback) => {
                    alert("Action two triggered!")
                }
            }
        ]
    }
}
```
<strong>Hint:</strong> There is no need to modify the custom extension in the admin dashboard because the URL of the
CDN is still the same as in sample01.

4. Reload Catalog Explorer:

http://localhost:8080/catalogexplorer/home/

### Expected outcomes:
* Catalog Explorer loads alongside the custom extension.
* The Actions menu appears in the navbar.
* Two new entries are added to the Actions menu.
* Actions are triggered upon clicking the menu items.

### Activities:
* Instead of using the alert function, use the toast message API:

```JavaScript
window.catex.workspace.toastMessage({message: "", type: "info"});
```

* Define a submenu and add two more entries inside the submenu
* 
<strong>Hint:</strong> Make sure the id is unique for every action. If the id is not unique, only the first command with the id
requested will be executed.

<strong>Hint:</strong> You can always refer to the catex.ts for reference. To add a submenu simply replace action for
children and pass an array of menu entries in the same way as you define normal navbar actions. See
example below:
```JavaScript
{
    label: "My submenu",
    title: "A test submenu",
    id: "uid - sub - 01",
    children: []
}
```

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

