import {getAPILink} from "../Helper/APILinkHelper";
import {IGaleryPictures} from "../IData/GaleryPictures/IGaleryPictures";
import axios, {AxiosResponse} from "axios";
import {IError} from "../IData/IError";

const apiLink: string = getAPILink() + "/GaleryPicture";

export async function GetPicturesBySubject(subject_pk: number): Promise<IGaleryPictures[]>{
    return await axios.get(apiLink + "/BySubject?subject_pk=" + subject_pk).then(function (response: AxiosResponse<any>) {
        return response.data;
    });
}
export async function GetPicturesById(picture_id: number): Promise<IGaleryPictures>{
    return await axios.get(apiLink+"/One?picture_pk="+picture_id).then(function (response: AxiosResponse<any>){
        return response.data;
    });
}
export async function DeletePictures(picture_id: number): Promise<IError>{
    return await axios.delete(apiLink + "/Delete?galeryPicture_pk="+picture_id).then(function (response) {
        console.log(response);
        if (response.status === 200) {
            return { type: "success", description: "Votre sujet a bien été supprimée !" };
        } else {
            return { type: "error", description: "Une erreur est survenue !" };
        }
    });
}