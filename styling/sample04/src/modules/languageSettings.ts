import {EnglishDictionary} from "./languages/EnglishDictionary";
import {SpanishDictionary} from "./languages/SpanishDictionary";

interface DictionaryEntry {
    [id:string]: {
        value: string;
    };
}

export type MasterDictionary = typeof EnglishDictionary;
export type MasterDictionaryKey = keyof MasterDictionary;

interface Dictionaries {
    [key:string]: MasterDictionary;
}

export class LanguageSettings {
    private static language: string;
    private static availableDictionaries: Dictionaries;
    private static dictionary: MasterDictionary;
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

    public static textByID(o:{id: MasterDictionaryKey, defaultText?: string, values?:{[key:string]: string}}): string {
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
        this.availableDictionaries = { "en": EnglishDictionary, "es": SpanishDictionary };
        this.setDictionary("en");
    }
}

LanguageSettings.register();


