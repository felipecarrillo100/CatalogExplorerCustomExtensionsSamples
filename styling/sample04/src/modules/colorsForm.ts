import {ToastMessageType} from "../interfaces/Catex";

export function colorsForm() {
    // Get the root element
    const root = document.documentElement;

    // Retrieve the current value of a CSS variable
   const defaultColor = getComputedStyle(root).getPropertyValue('--color-primary');
   window.catex.workspace.createJSONSchemaForm(colorsSchema(defaultColor), {
       onChange: (formData) => {
           // Change color on the fly
           root.style.setProperty('--color-primary', formData.primaryColor);
       },
       onCancel: ()=>{
           // On cancel revert to default
           root.style.setProperty('--color-primary', defaultColor);
       },
       onSuccess: (formData) => {
           // On success store the value to persist it
           localStorage.setItem("app-primary-color", formData.primaryColor);
           window.catex.workspace.toastMessage({message: "Color successfully changed", type: ToastMessageType.success})
       }
   })
}

function colorsSchema(defaultColor: string) {
    return {
        schema: {
            "title": "Color Preferences",
            "description": "A simple form to change colors.",
            "type": "object",
            "required": [
                "primaryColor",
            ],
            "properties": {
                "primaryColor": {
                    "type": "string",
                    "title": "Primary color:",
                    "default": defaultColor
                },
            }
        },
        uiSchema:{
            "primaryColor": {
                "ui:widget": "color"
            },
        }
    }
}
