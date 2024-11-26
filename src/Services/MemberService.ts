
import {IError} from "../IData/IError";
import axios from "axios";
import {getAPILink} from "../Helper/APILinkHelper";
import {IMember} from "../IData/Member/IMember";

const apiLink: string = getAPILink() + "/Member";

export async function GetAllMembers(): Promise<IMember[]> {
    let commands: IMember[] = [];
    await axios.get(apiLink + "/All").then(function (response) {
        if (response.status !== 200) {
            throw new Error("Impossible de récupérer les membres !");
        }else
            commands = response.data;
    });
    return commands;
}
export async function GetAllMembersByType(type: string): Promise<IMember[]> {
    let commands: IMember[] = [];
    await axios.get(apiLink + "/ByType?type="+ type).then(function (response) {
        if (response.status !== 200) {
            throw new Error("Impossible de récupérer les membres du  type : " + type + " !");
        }else
            commands = response.data;
    });
    return commands;
}

export async function GetMember(member_pk: number): Promise<IMember> {
    return await axios.get(apiLink + "/One?member_pk="+member_pk).then(function (response) {
        return response.data;
    });
}
export async function DeleteMeber(member_pk: number): Promise<IError> {
    return await axios.delete(apiLink + "/Delete?member_pk="+member_pk).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre membre a bien été supprimée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function CreateMember(command: IMember): Promise<IError> {
    return await axios.post(apiLink + "/Create?", command , {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log(response);
        if (response.status === 200 ||response.status === 204) {
            return { type: "success", description: "Votre Membre a bien été ajoutée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function UpdateMember(command: IMember): Promise<IError> {
    return await axios.put(apiLink + "/Update?",command , {
        headers: {
            "Content-Type": "application/json"
        }}).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre Membre a bien été modifiée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}