import axios from "axios";
import {ISheet} from "../IData/Sheet/ISheet";
import {IError} from "../IData/IError";
import {getAPILink} from "../Helper/APILinkHelper";


const apiLink: string = getAPILink() + "/Sheet";

export async function GetAllSheets(numberPerPage: number, offset: number): Promise<ISheet[]> {
    let sheets: ISheet[] = [];
    try {
        await axios.get(apiLink + "/All?numberPerPage=" + numberPerPage + "&offset=" + offset).then(function (response) {
            sheets = response.data;
        });
        return sheets;
    }catch(_err) {
        return sheets;
    }
}
export async function GetAllSheetsFiltered(numberPerPage: number, offset: number, search: string): Promise<ISheet[]> {
    let sheets: ISheet[] = [];
    try {
        await axios.get(apiLink + "/AllFiltered?numberPerPage=" + numberPerPage + "&offset=" + offset + "&search=" + search).then(function (response) {
            sheets = response.data;
        });
    }catch(_err) {}
    return sheets;
}
export async function GetSheet(sheet_pk: number): Promise<ISheet> {
    try {
        return await axios.get(apiLink + "/One?sheet_pk=" + sheet_pk).then(function (response) {
            if (response.data) return response.data;
            else return null;
        });
    }
    catch(_err) {return {commands: [], communication: "", id: 0, name: "", total: 0}}
}
export async function GetNumberSheets(): Promise<number> {
    try {
        return await axios.get(apiLink + "/Number").then(function (response) {
            if (response.data) return response.data;
            else return 0;
        });
    }catch(_err) {
        return 0;
    }
}
export async function GetNumberSheetsFiltered(search: string): Promise<number> {
    try {
        return await axios.get(apiLink + "/NumberFiltered?search=" + search).then(function (response) {
            if (response.data) return response.data;
            else return 0;
        });
    }
    catch(_err) {
        return 0;
    }
}
export async function DeleteSheet(sheet_pk: number): Promise<IError> {
    return await axios.delete(apiLink + "/Delete?sheet_pk="+sheet_pk).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre feuille a bien été supprimée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function CreateSheet(sheet: ISheet): Promise<IError> {
    return await axios.post(apiLink + "/Create?", sheet , {
        headers: {
            "Content-Type": "application/json"
        }
        }).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre feuille a bien été ajoutée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function UpdateSheet(sheet: ISheet): Promise<IError> {
    return await axios.put(apiLink + "/Update?",sheet , {
        headers: {
            "Content-Type": "application/json"
        }}).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre feuille a bien été modifiée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}