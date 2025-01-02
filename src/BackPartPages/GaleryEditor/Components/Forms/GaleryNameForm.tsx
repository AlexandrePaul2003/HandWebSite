import {IOption} from "../../../../IData/IOption";
import {GaleryEditorSubjectForm} from "../GaleryEditorSubjectForm";
import {ValidationPopup} from "../../../../components/ValidationPopup";
import React, {useState} from "react";
import {DeleteGalerySubject} from "../../../../Services/GalerySubjectService";
import {useNavigate} from "react-router-dom";
interface IProps {
    option: IOption;
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}
export function GaleryNameForm(props: IProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [deleteFunction, setDeleteFunction] = React.useState<any>();
    const navigate = useNavigate();
    return (
        <>
            <ValidationPopup open={isOpen} setOpen={(value: boolean): void => setIsOpen(value)}
                             OnConfirm={ConfirmDelete}
                             text={"Voulez-vous vraiment supprimer cette galerie et toutes ses images ?"}/>
            {!props.isEditing ? (
                <h2 onClick={(): void => props.setIsEditing(true)}>{props.option.label}</h2>
            ) : (
                <>{props.option.value > -1 ? (<GaleryEditorSubjectForm subject_pk={props.option.value}
                                                                       cancelEditing={(value): void => props.setIsEditing(!value)}/>
                ) : (
                    <h2>{props.option.label}</h2>
                )}</>

            )}
            {props.option.value > -1 && (
                <>
                    <button
                        type="button"
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        onClick={(): void => {
                            setIsOpen(true);
                            setDeleteFunction(() => () => DeleteGalerySubject(props.option.value));
                        }}
                    >
                        Supprimer
                    </button>
                    <button
                        type="button"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={(): void => navigate("/staff/galeryPictureForm/"+props.option.value)}
                    >
                        Ajouter
                    </button>
                </>
            )}
        </>
    );

    function ConfirmDelete(): void {
        deleteFunction();
        window.location.reload();
    }
}