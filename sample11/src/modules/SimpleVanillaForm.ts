import {CreateCustomFormRenderHandlers, PanelTarget, ToastMessageType} from "../interfaces/Catex";

export function openSimpleVanillaForm() {
    window.catex.workspace.createCustomForm(MyVanillaForm, {
        title:"Tell us about you",
        panel: PanelTarget.Right
    })
}

export function openSimpleVanillaWindow(uid: string) {
    window.catex.workspace.createCustomWindow(MyVanillaWindow, {
        uid,
        title:"Test Floating Window " + uid,
        padding: "20px",
        initialPosition: {bottom:20, right: 20},
        initialSize: {width:"50%", height: 320},
    })
}

function MyVanillaForm(element: HTMLElement, handlers: CreateCustomFormRenderHandlers) {
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
            window.catex.workspace.toastMessage({message:"Form submited", type: ToastMessageType.success});
            const firstname = document.getElementById("input-ui-first") as HTMLInputElement;
            const lastname = document.getElementById("input-ui-lastname") as HTMLInputElement;
            const formData = {
                firstname: firstname.value,
                lastname: lastname.value
            }
            console.log(formData);
        }
    })
    element.append(div);
}


function MyVanillaWindow(element: HTMLElement, handlers: CreateCustomFormRenderHandlers) {
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
                        <button class="btn btn-secondary" id="button-close">Close</button>
                        <button class="btn btn-primary" id="button-submit">Submit</button>
                      </div>`
    handlers.init({
        onCancel: ()=>{
            window.catex.workspace.toastMessage({message:"Operations cancelled by user", type: ToastMessageType.warning});
        },
        onSubmit: ()=>{
            window.catex.workspace.toastMessage({message:"Form submited", type: ToastMessageType.success});
            const firstname = document.getElementById("input-ui-first") as HTMLInputElement;
            const lastname = document.getElementById("input-ui-lastname") as HTMLInputElement;
            const formData = {
                firstname: firstname.value,
                lastname: lastname.value
            }
            console.log(formData);
        }
    })
    element.append(div);
    const closeButton = document.getElementById("button-close") as HTMLButtonElement;
    const submitButton = document.getElementById("button-submit") as HTMLButtonElement;

    closeButton.onclick = ()=>{
        handlers.cancel();
    }
    submitButton.onclick = ()=>{
        handlers.submit();
    }
}
