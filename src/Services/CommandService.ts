
import {IError} from "../IData/IError";
import axios from "axios";
import {ICommand} from "../IData/Command/ICommand";
import {getAPILink} from "../Helper/APILinkHelper";

const apiLink: string = getAPILink() + "/Command";

/*export async function GetAllCommands(): Promise<ICommand[]> {
    let commands: ICommand[] = [];
    await axios.get(APILinkHelper + "/All").then(function (response) {
        if (response.status !== 200) {
            throw new Error("Impossible de récupérer les feuilles !");
        }else
            commands = response.data;
    });
    return commands;
}*/
export async function GetCommand(command_pk: number): Promise<ICommand> {
    return await axios.get(apiLink + "/One?command_pk="+command_pk).then(function (response) {
        return response.data;
    });
}
export async function DeleteCommand(command_pk: number): Promise<IError> {
    return await axios.delete(apiLink + "/Delete?command_pk="+command_pk).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre commande a bien été supprimée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function CreateCommand(command: ICommand): Promise<IError> {
    return await axios.post(apiLink + "/Create?", command , {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre commande a bien été ajoutée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function UpdateCommand(command: ICommand): Promise<IError> {
    return await axios.put(apiLink + "/Update?",command , {
        headers: {
            "Content-Type": "application/json"
        }}).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre commande a bien été modifiée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}
export async function GetGlobalTotalCommand(): Promise<number> {
    return await axios.get(apiLink + "/TotalGlobal").then(function (response) {
        if (response.status !== 200) {
            throw new Error("Impossible de récupérer le montant totale !");
        }else
            return response.data;
    });
}