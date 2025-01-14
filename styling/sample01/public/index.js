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
