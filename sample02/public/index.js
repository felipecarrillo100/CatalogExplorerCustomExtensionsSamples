window.catex = {
    map: {
        onMouseClick:[
            {
                action: function(o, callback) {
                    console.log("Mouse click on map from Custom Extension CDN!!:", o);
                }
            },
        ]
    },
    app: {
        navbarActionsLabel: "MY APP MENU",
        navbarActions: [
            {
                label: "Trigger action 1",
                title: "Action 1",
                id: "uid01",
                action: (o, callback)=>{
                    window.catex.workspace.toastMessage({message: "Action one triggered!", type: "info"})
                }
            },
            {
                label: "Trigger action 2",
                title: "Action 2",
                id: "uid02",
                action: (o, callback)=>{
                    window.catex.workspace.toastMessage({message: "Action two triggered!", type: "info"})
                }
            },
            {
                label: "Submenu 1",
                title: "A Submenu",
                id: "submenu-01",
                children: [
                    {
                        label: "Trigger action 3",
                        title: "Action 3",
                        id: "uid-sub1-01",
                        action: (o, callback)=>{
                            window.catex.workspace.toastMessage({message: "Action three was triggered!", type: "info"})
                        }
                    },
                ]
            }

        ]
    }
}
