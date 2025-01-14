import {CreateCustomFormRenderHandlers, PanelTarget, ToastMessageType} from "../interfaces/Catex";

export function openSimpleVanillaForm() {
    window.catex.workspace.createCustomForm(MyVanillaForm, {
        title:"Tell us about you",
        panel: PanelTarget.Left
    })
}

function MyVanillaForm(element: HTMLBRElement, handlers: CreateCustomFormRenderHandlers) {
    const div = document.createElement("div");
    div.innerHTML = `<div>
                        <h5>Enter your name</h5>
                        <div class="form-group">
                            <label class="form-label" for="input-ui-first">First name:</label>
                            <input id="input-ui-first" class="form-control" type="text" name="firstname" value="" placeholder="Enter your first name">                            
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="input-ui-lastname">Last name:</label>
                            <input id="input-ui-lastname" class="form-control" type="text" name="lastname" value=""  placeholder="Enter your last name">                            
                        </div>
                      </div>`
    handlers.init({
        onCancel: ()=>{
            window.catex.workspace.toastMessage({message:"Operations cancelled by user", type: ToastMessageType.warning});
        },
        onSubmit: ()=>{
            const firstname = document.getElementById("input-ui-first") as HTMLInputElement;
            const lastname = document.getElementById("input-ui-lastname") as HTMLInputElement;
            const formData = {
                firstname: firstname.value,
                lastname: lastname.value
            }
            window.catex.workspace.toastMessage({message:`Hello ${formData.firstname}`, type: ToastMessageType.success});
            console.log(formData);
        }
    })
    element.append(div);
}
