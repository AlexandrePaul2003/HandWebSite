import {GaleryEditorSelect} from "./Components/GaleryEditorSelect";
import {IOption} from "../../IData/IOption";
import {GaleryEditorSubjectForm} from "./Components/GaleryEditorSubjectForm";
import {useEffect, useState} from "react";
import {GetNumberSheets} from "../../Services/SheetService";
import {IGaleryPictures} from "../../IData/GaleryPictures/IGaleryPictures";
import {toast} from "react-toastify";
import {getTostifyParams} from "../../Helper/TostifyHelper";
import {GetPicturesBySubject} from "../../Services/GaleryPictureService";
import {GaleryPictures} from "./Components/GaleryPictures";
import {GaleryNameForm} from "./Components/Forms/GaleryNameForm";
import {ValidationPopup} from "../../components/ValidationPopup";


export function GaleryEditor(): JSX.Element{
    const [pictures, setPictures] = useState<IGaleryPictures[]>([]);
    const [selectedGalery, setSelectedGalery] = useState<IOption>({label: "Toutes", value: -1});
    const [ isEditing, setIsEditing ] = useState(false);
    useEffect(() => {
        try {
            GetPictures(-1);
        }
        catch (ex: any){
            alert(ex.message);
        }

    }, []);

    return (
        <div>
            <div className="flex h-2/12">
                <div className="w-3/12 h-2/12">
                    <GaleryEditorSelect onChange={(option: IOption): void => {
                        GetPictures(option.value);
                        setSelectedGalery(option);
                        setIsEditing(false);
                    }}/>
                </div>
                <div className="w-3/12 h-2/12">
                    <GaleryEditorSubjectForm subject_pk={-1}/>
                </div>
                <div className="w-3/12 h-2/12">
                    <GaleryNameForm option={selectedGalery} isEditing={isEditing}
                                    setIsEditing={function (IsEditing: boolean): void {
                                        setIsEditing(IsEditing);
                                    }}/>
                </div>
            </div>
            <div>
                <GaleryPictures pictures={pictures}/>
            </div>
        </div>
    );

    function GetPictures(subject_pk: number): void {
        try {
             GetPicturesBySubject(subject_pk).then((pics: IGaleryPictures[]): void => {
                setPictures(pics);
            });
        } catch (e: any) {
            toast.error(e.message, getTostifyParams());
        }
    }
};