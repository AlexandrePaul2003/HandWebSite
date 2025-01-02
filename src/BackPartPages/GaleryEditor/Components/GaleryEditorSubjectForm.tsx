import {NavigateFunction, useNavigate} from "react-router-dom";
import {IGalerySubject} from "../../../IData/GalerySubject/IGalerySubject";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {TextFieldForm} from "../../../components/Form/TextFieldForm";
import {Button} from "@mui/material";
import React from "react";
import {toast} from "react-toastify";
import {getTostifyParams} from "../../../Helper/TostifyHelper";
import {CreateGalerySubject, GetSubjectById, UpdateGalerySubject} from "../../../Services/GalerySubjectService";
interface IProps {
    subject_pk: number;
    cancelEditing?: (cancel: boolean) => void;
}

export function GaleryEditorSubjectForm(props: IProps): JSX.Element {
    const subject_pk: number = props.subject_pk;
    const navigate: NavigateFunction = useNavigate();

    const defaultSubject: IGalerySubject = {
        id: -1,
        name:"",
        desc:""
    }
    const sheetShema = yup.object().shape({
        name: yup.string().required(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(sheetShema),
        defaultValues: LocalGetSubject,
    });
    async function LocalGetSubject(): Promise<IGalerySubject> {
        let subject : IGalerySubject = defaultSubject;
        if (subject_pk > -1){
            subject = await GetSubjectById(subject_pk);
        }
        return subject;
    }
    async function OnSubmit(subject: IGalerySubject): Promise<void> {
        let status = subject_pk > -1 ? await UpdateGalerySubject(subject) : await CreateGalerySubject(subject);
        if (status.type === "success"){
            toast.success(status.description, getTostifyParams());
            window.location.reload();
        } else{
            toast.error(status.description, getTostifyParams());
        }
    }
    return (
        <>
            <div style={{alignItems: "center", width: "100%", justifyContent: "center"}}>

                <form style={{ flexDirection: "column", gap: "10px"}}
                      onSubmit={handleSubmit((subject ) => OnSubmit(subject as IGalerySubject))}>
                    <TextFieldForm displayName={""} register={register} formName={'name'} errors={errors}/>
                    {subject_pk > -1 ? (
                        <div>
                            <Button type="submit">Modifier </Button>
                            <Button type="button" onClick={(): void => {if (props.cancelEditing) props.cancelEditing(true)}}>Annuler </Button>
                        </div>
                    ) : (
                        <Button type="submit">Créer </Button>
                    )}
                </form>
            </div>
        </>
    );
};