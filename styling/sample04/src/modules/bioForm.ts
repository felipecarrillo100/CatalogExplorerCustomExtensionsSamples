import {ToastMessageType} from "../interfaces/Catex";
import {LanguageSettings} from "./languageSettings";

export function openBioForm() {
   window.catex.workspace.createJSONSchemaForm(bioFormSchema(), {
       onCancel: ()=>{
           window.catex.workspace.toastMessage({message: "Calceled by user", type: ToastMessageType.warning})
       },
       onSuccess: (formData) => {
           console.log(formData);
           window.catex.workspace.toastMessage({message: "Successfully submitted", type: ToastMessageType.success})
       }
   })
}

function bioFormSchema() {
    return {
        schema: {
            "title": LanguageSettings.textByID({id:"bioFormSchema.schema.title", defaultText: "Personal bio"}),
            "description":  LanguageSettings.textByID({id:"bioFormSchema.schema.description", defaultText: "A simple form example."}),
            "type": "object",
            "required": [
                "firstName",
                "lastName"
            ],
            "properties": {
                "Address": {
                    "type": "string",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.address",  defaultText: "Your address"}),
                    "default": "Brussels"
                },
                "firstName": {
                    "type": "string",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.firstname",  defaultText: "First name"}),
                    "default": "Chuck"
                },
                "lastName": {
                    "type": "string",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.lastname", defaultText:"Last name"})
                },
                "age": {
                    "type": "integer",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.age", defaultText:"Age"})
                },
                "bio": {
                    "type": "string",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.bio", defaultText:"Bio"})
                },
                "password": {
                    "type": "string",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.password", defaultText:"Password"}),
                    "minLength": 3
                },
                "telephone": {
                    "type": "string",
                    "title": LanguageSettings.textByID({id:"bioFormSchema.schema.data.phone", defaultText:"Telephone"}),
                    "minLength": 10
                }
            }
        },
        uiSchema:{
            "firstName": {
                "ui:autofocus": true,
                "ui:emptyValue": "",
                "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
                "ui:autocomplete": "family-name",
                "ui:enableMarkdownInDescription": true,
                "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/)."
            },
            "lastName": {
                "ui:autocomplete": "given-name",
                "ui:enableMarkdownInDescription": true,
                "ui:description": "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> "
            },
            "age": {
                "ui:widget": "updown",
                "ui:title": "Age of person",
                "ui:description": "(earth year)"
            },
            "bio": {
                "ui:widget": "textarea"
            },
            "password": {
                "ui:widget": "password",
                "ui:help": "Hint: Make it strong!"
            },
            "telephone": {
                "ui:options": {
                    "inputType": "tel"
                }
            }
        },
        formData:{
            "firstName": "Chuck",
            "lastName": "Norris",
            "age": 75,
            "bio": "Roundhouse kicking asses since 1940",
            "password": "noneed",
            "telephone": "1-800-KICKASS"
        }
    }
}
