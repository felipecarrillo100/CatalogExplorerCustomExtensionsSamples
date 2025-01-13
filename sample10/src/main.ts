import {Catex} from "./interfaces/Catex";
import {openBioForm} from "./modules/bioForm";
import {openChartsForm} from "./componets/SampleChartsForm";
import {openCreateCircleForm} from "./componets/CreateCircleForm";
import {openCreateCircleWidgetForm} from "./componets/CreateCircleWidgetForm";

window.catex = {
    app: {
        navbarActions: [
            {
                label: "Forms With JSOn Schema",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub1",
                children:[
                    {
                        label: "Open Bio",
                        title: "Just a sample of JSON Schema",
                        id: "id-form-1",
                        action: (o, callback) => {
                            openBioForm()
                        }
                    },
                ]
            },
            {
                label: "Forms With React",
                title: "Just a sample of JSON Schema",
                id: "id-form-sub2",
                children:[
                    {
                        label: "Sample form with charts",
                        title: "Just a sample form with React",
                        id: "id-form-2",
                        action: (o, callback) => {
                            openChartsForm()
                        }
                    },
                    {
                        label: "Create circle",
                        title: "Just a sample form with React",
                        id: "id-form-3",
                        action: (o, callback) => {
                            openCreateCircleForm()
                        }
                    },
                    {
                        label: "Create circle with widget",
                        title: "Just a sample form with React",
                        id: "id-form-4",
                        action: (o, callback) => {
                            openCreateCircleWidgetForm()
                        }
                    },
                ]
            },
        ]
    }
} as Catex;
