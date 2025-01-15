// Define the type of Window.catex object
declare global {
    interface Window { catex: Catex; }
}

// A CatexCompanionDataTransformer is used to convert data from one format to another
export interface CatexCompanionDataTransformer {
    name: string;
    extensions?: string;
    transform: (content: string | ArrayBuffer, contentType?: string) => string;
    validate?: (options: CatexCompanionDataTransformerCheck) => boolean;
    type?: "Text" | "DataUrl" | "BinaryString" | "ArrayBuffer";
    target?: string;
}

// CatexCompanionDataTransformerCheck provides a mechanism to validate the input data
interface CatexCompanionDataTransformerCheck {
    filename: string;
    content?: string;
    contentType?: string;
    contentLength?: number;
}

// CustomServiceQueryOptions provides a data structure to perform a query
export interface CustomServiceQueryOptions {
    search: string;
    pageSize: number;
    pageNumber: number;
    order?: "ASC" | "DESC",
    sortBy?: string;
}

// CustomServiceQueryResult: Provides a data structure to return the results of a query
export interface CustomServiceQueryResult {
    rows: any;
    matches: number;
    total: number;
}

export enum CustomWebServiceEntryType {
    WMS = "WMS",
    WFS = "WFS",
    WMTS = "WMTS",
    LTS = "LTS",
    HSPC= "HSPC",
    MESH= "MESH",
    PANORAMA="PANORAMA"
}
interface CustomWebServiceEntry {
    id: string;
    label: string;
    title?: string;
    type: CustomWebServiceEntryType;
    endpoint: string;
    layers?: string[];
}

interface CustomWebServiceEntryCommand {
    id: string;
    label: string;
    title?: string;
    type: string;
    command: any;
}

export type CustomWebServiceEntryList = (CustomWebServiceEntry | CustomWebServiceEntryCommand)[];

export interface CustomWebServiceResult {
    rows: CustomWebServiceEntryList;
    matches: number;
    total: number;
}
// NavBarEntryWebservice: Provides a data structure to define data Webs service that provide data

export interface NavBarEntryWebservice {
    label: string;
    title: string;
    id: string;
    action: (o: CustomServiceQueryOptions, callback: (entries:CustomWebServiceResult)=>void)=>void;
}

// NavBarEntryCustomActions: Provides a data structure to define new actions to be added to the navbar
export type NavBarEntryCustomActions = NavBarEntryCustomEntry | NavBarEntryCustomSubMenu | NavBarEntryCustomDivider
export interface NavBarEntryCustomDivider {
    divider: boolean;
}

export interface NavBarEntryCustomEntry {
    label: string;
    title: string;
    id: string;
    action: (o?: any, callback?: any)=>void;
}
export interface NavBarEntryCustomSubMenu {
    label: string;
    title: string;
    id: string;
    children: NavBarEntryCustomActions[];
}

// MenuEntryFeatureSelect: Defines the data structure to create actions in response to Single Feature selected
interface MenuEntryFeatureSelect {
    label: string;
    title: string;
    validate?: (parameters: {contextMenu: any, layer: any, features: any[]}) => boolean;
    action: (parameters: {feature: any; model: any; layer: any;}, callback: (properties: {[key: string]: any})=>void) => void;
}

// MenuEntryFeatureSelect: Defines the data structure to create actions in response to Multiple Feature selected
interface MenuEntryMultiFeatureSelect {
    label: string;
    title: string;
    validate?: (parameters: {contextMenu: any, layer: any, features: any[]}) => boolean;
    action: (parameters: {features: any[]; model: any; layer: any;}, callback: (properties: {[key: string]: any})=>void) => void;
}

export interface CreateCustomFormOptions {
    title: string;
    panel?: PanelTarget;
    buttons?: {
        cancel: boolean;
        submit: boolean;
    }
}

export interface CreateCustomWindowOptions {
    uid: string;
    title: string;
    buttons?: {
        cancel: boolean;
        submit: boolean;
    }
    padding?: string;
    initialPosition?: {top?: number,left?: number; right?: number, bottom?: number};
    initialSize?: {width?: number|string, height?: number|string};
}
export interface CreateCustomFormRenderHandlers {
    cancel: ()=>void;
    submit: ()=>void;
    init:(v:CustomExternalFormActions)=>void;
    fields: any;
}
export interface CustomExternalFormActions {
    canClose?:()=>boolean;
    isReady?:()=>boolean;
    onCancel?:()=>void;
    onSubmit?:()=>void;
}
export type CreateCustomFormRender = (e: HTMLElement, handlers: CreateCustomFormRenderHandlers)=>void;

interface JSONSchemaFormInputs {
    schema: any;
    uiSchema?: any;
    formData?: any;
}

export enum PanelTarget {
    Left = "left",
    Right = "right",
}
interface CreateJSONSchemaFormOptions {
    panel?: PanelTarget;
    onChange?: (formData: any)=> void;
    onCancel?: ()=>void;
    onSuccess?:(formData: any) => void;
}

interface FitToBoundsOptions {
    crs?: string;
    callback?: ()=>void;
    animate?: boolean;
    fitMargin?: string;
}

export enum  ToastMessageType {
    warning = "warning",
    error = "error",
    info = "info",
    success = "success",
}

export enum PredefinedLayers {
    Grid = "Grid",
    Annotations = "AnnotationsLayerId",
    ClippingMask = "ClippingMaskLayerId",
    BoxSlicingGroup = "box-slicing-group-id",
    BoxSlicing = "box-slicing-layer-id"
}

interface FieldJSONSchema {
    domElement: HTMLDivElement
    formData: any
    onChange: (data: any) => void;
    onSuccess: (formData: any) => void;
    validate: ()=>void;
}

interface GeoJSONFeature {
    id?: string;
    type?: "Feature",
    properties: {[key:string]: any}
    geometry: {
        type: "Point" | "LineString" | "Polygon" | "MultiPoint" | "MultiLineString" | "MultiPolygon" | "GeometryCollection";
        coordinates: number[] | number [][] | number [][][];
    }
}
interface GeoJSONToFeatureOptions {
    crs?: string;
    swapAxes?: boolean;
}
interface GeoJSONDecodeOptions {
    generateIDs?: boolean;
    crs?: string;
    swapAxes?: boolean;
}
export interface Catex {
    app?: {
        getUserInfo?:() => Promise<any>;
        onAppReady?: () => void;
        navbarActions?: NavBarEntryCustomActions[];
        navbarActionsLabel?: string;
        webservices?: NavBarEntryWebservice[];
        webservicesLabel?: string;
    };
    workspace?: {
        emitCommand: (command: any) => void;
        createCustomWindow: (render: CreateCustomFormRender, options: CreateCustomWindowOptions) => void;
        createCustomForm: (render: CreateCustomFormRender, options: CreateCustomFormOptions) => void;
        createJSONSchemaForm: (inputs: JSONSchemaFormInputs, options: CreateJSONSchemaFormOptions) => void;
        toastMessage: (toast: {message: string, type: ToastMessageType}) => void;
        createFieldJSONSchema: (element: HTMLDivElement, json: JSONSchemaFormInputs, fields?: any) => FieldJSONSchema;
    };
    featureLayer?: {
        onFeatureSelect?: MenuEntryFeatureSelect[];
        onMultiFeatureSelect?: MenuEntryMultiFeatureSelect[];
        onRender?: (layer: any, feature: any, style: any, map: any, paintState: any) => void;
    };
    ogc3dTiles?: {
        onFeatureSelect?: MenuEntryFeatureSelect[]
        onMultiFeatureSelect?: MenuEntryMultiFeatureSelect[]
    };
    data?: {
        transformers?: CatexCompanionDataTransformer[]
    };
    map?: {
        fitToBounds?: (bbox: number[], options?: FitToBoundsOptions) => void;
        deleteLayerByID?: (id:string) => void;
        getMainMap?: () => any;
        onMouseClick?: onMouseClickEvent[],
        onMapMove?: onMapMoveEvent[],
        onMousePoint?: onMousePointEvent[],
        getCurrentLayerID?: () => string;
        getLayerByID?: (id:string) => any;
        onMainMapUpdated?(task:()=>void): string;
        offMainMapUpdated?(id: string): boolean;
    };
    utils?: {
        boundingBox: (shape: any) => number[];
        pointToArray: (point: any) => number[];
        shapeToGeoJSON: (shape: any) => any;
        featureToGeoJSON: (feature: any) => GeoJSONFeature;
        GeoJSONToFeature: (jsonFeature: GeoJSONFeature, options?: GeoJSONToFeatureOptions)=>any;  // Returns Luciad Feature
        GeoJSONDecode: (json: any, options?: GeoJSONDecodeOptions)=>any[]; // Returns Luciad Array of Features
    },
    JSONSchema?: {
        schema: {
            Point: any;
            GazetteerPoint: any;
            LineString: any;
            Polygon: any;
            BBox: any;
            GazetteerBBox: any;
        },
        uiSchema: {
            GazetteerPoint: any;
            GazetteerBBox: any;
            Point: any;
            LineString: any;
            Polygon: any;
            BBox: any;
        }
    }
}

// onMouseClickEvent: Defines the data structure to create actions in response to OnMouseClick on map
interface onMouseClickEvent {
    action: (o: {
        point: any;
        feature?: any;
        layer?: any;
        map: any;
    }, callback: any) => void;
}

// onMapMoveEvent: Defines the data structure to create actions in response to OnMapMove
interface onMapMoveEvent {
    action: (o: {bounds: any; map: any}, callback: any) => void;
}

// onMousePointEvent: Defines the data structure to create actions in response to onMousePoint
interface onMousePointEvent {
    action: (o: {point: any; map: any}, callback: any) => void;
}

