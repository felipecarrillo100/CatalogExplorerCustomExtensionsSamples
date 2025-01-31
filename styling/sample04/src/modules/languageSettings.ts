import {EnglishDictionary} from "./languages/EnglishDictionary";
import {SpanishDictionary} from "./languages/SpanishDictionary";

interface DictionaryEntry {
    [id:string]: {
        value: string;
    };
}
export interface Dictionary {
    [key:string]: DictionaryEntry;
}

interface Dictionaries {
    [key:string]: Dictionary;
}

export class LanguageSettings {
    private static language: string;
    private static availableDictionaries: Dictionaries;
    private static dictionary: Dictionary;
    static setLanguage(s: string) {
        this.language = s;
        this.setDictionary(this.language)
    }

    static getLanguage() {
        return this.language;
    }

    private static setDictionary(language: string) {
        this.dictionary = this.availableDictionaries[language];
    }

    public static textByID(o:{id: string, defaultText?: string, values?:{[key:string]: string}}): string {
        const defaultText = o.defaultText ? o.defaultText : "Missing Translation";
        // @ts-ignore
        const translation: string = this.dictionary[o.id]?.value ? this.dictionary[o.id].value : o.defaultText
        return this.replaceValues(translation, o.values ? o.values : {});
    }

    private static replaceValues(path: string, values: {[key:string]: string}):  string {
        const escapeRegExp = (str:string) =>  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const paramsPattern = /[^{}]+(?=})/g;
        const extractParams = path.match(paramsPattern);
        const myObject: {[key:string]: string} = {};
        if (extractParams) {
            for (const key of extractParams) myObject[key] = values[key] ? values[key]: "";
            for (const key in myObject) {
                if (myObject.hasOwnProperty(key)) {
                    path = path.replace(new RegExp(escapeRegExp(`{${key}}`), 'g'), myObject[key]);
                }
            }
        }
        return path;
    }

    static register() {
        // @ts-ignore
        this.availableDictionaries = { ...EnglishDictionary, ...SpanishDictionary };
        this.setDictionary("en");

        console.log(this.availableDictionaries);
    }
}

LanguageSettings.register();


