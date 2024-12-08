import {ICommand} from "../IData/Command/ICommand";
import axios from "axios";
import {IError} from "../IData/IError";
import {getAPILink} from "../Helper/APILinkHelper";
import {IGalerySubject} from "../IData/GalerySubject/IGalerySubject";


const apiLink: string = getAPILink() + "/GalerySubject";

export async function GetAllSubjects(): Promise<IGalerySubject[]> {
    return await axios.get(apiLink + "/All").then(function (response) {
        return response.data;
    });
}
export async function DeleteGalerySubject(subject_pk: number): Promise<IError> {
    return await axios.delete(apiLink + "/Delete?galerySubject_pk="+subject_pk).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre sujet a bien été supprimée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function CreateGalerySubject(subject: IGalerySubject): Promise<IError> {
    return await axios.post(apiLink + "/Create?", subject , {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre sujet a bien été ajoutée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function UpdateGalerySubject(subject: IGalerySubject): Promise<IError> {
    return await axios.put(apiLink + "/Update?",subject , {
        headers: {
            "Content-Type": "application/json"
        }}).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre sujet a bien été modifiée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
