import {CreateCustomFormRenderHandlers, PanelTarget, ToastMessageType} from "../interfaces/Catex";

export function openSampleJSForm() {
    window.catex.workspace.createCustomForm(MyVanillaForm, {
        title:"Calculate hypotenuse",
        panel: PanelTarget.Left
    })
}

function MyVanillaForm(element: HTMLElement, handlers: CreateCustomFormRenderHandlers) {
    const div = document.createElement("div");
    div.innerHTML = `<div>
                        <h5>Calculates c^2 =  a^2 + b^2</h5>
                        <div class="form-group">
                            <label class="form-label" for="input-ui-a">a:</label>
                            <input id="input-ui-a" class="form-control" type="number" name="a" value="0">                            
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="input-ui-b">b:</label>
                            <input id="input-ui-b" class="form-control" type="number" name="b" value="0">                            
                        </div>
                        <div class="form-group">
                            <label class="form-label" for="input-ui-c">c:</label>
                            <input id="input-ui-c" class="form-control" type="number" name="c" value="0" readonly>                            
                        </div>
                        <button class="btn btn-primary" id="button-calculate">Calculate</button>
                        <button class="btn btn-primary" id="button-close">Close</button>
                      </div>`
    handlers.init({
        onCancel: ()=>{
            window.catex.workspace.toastMessage({message: "Cancelled by user", type: ToastMessageType.warning})
        },
        onSubmit: ()=>{
            window.catex.workspace.toastMessage({message: "Form submitted by user", type: ToastMessageType.success})
        }
    })
    element.append(div);
    const calculateButton = document.getElementById("button-calculate") as HTMLButtonElement;
    const calculateClose = document.getElementById("button-close") as HTMLButtonElement;
    calculateButton.onclick = ()=>{
        const a = document.getElementById("input-ui-a") as HTMLInputElement;
        const b = document.getElementById("input-ui-b") as HTMLInputElement;
        const c = document.getElementById("input-ui-c") as HTMLInputElement;
        c.value = Math.sqrt(Number(a.value)**2 + Number(b.value)**2).toString()
    }
    calculateClose.onclick = () => {
        handlers.cancel();
    }
}
