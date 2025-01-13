window.catex = {
    map: {
        onMouseClick:[
            {
                action: function(o, callback) {
                    console.log("Mouse click on map from Custom Extension CDN!!:", o);
                }
            },
        ],
        onMapMove:[
            {
                action: function(o, callback) {
                    console.log("Mouse onMapMoveEvent on map from Custom Extension CDN!!:", o);
                }
            },
        ],
        onMousePoint:[
            {
                action: function(o, callback) {
                    console.log("Mouse onMousePointEvent on map from Custom Extension CDN!!:", o);
                }
            },
        ]
    }
}
