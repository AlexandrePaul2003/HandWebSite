import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {ISheet} from "../../../../IData/Sheet/ISheet";
import React, {useEffect} from "react";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {ICommand} from "../../../../IData/Command/ICommand";
import {CreateCommand, GetCommand, UpdateCommand} from "../../../../Services/CommandService";
import {Button, TextField} from "@mui/material";
import {toast} from "react-toastify";
import {getTostifyParams} from "../../../../Helper/TostifyHelper";
import {TextFieldForm} from "../../../../components/Form/TextFieldForm";


export const CommandForm = () => {
    const navigate: NavigateFunction = useNavigate();
    const command_pk: number = Number(useParams().Id);
    const sheet_pk: number = Number(useParams().SheetPK);

    const defaultCommand : ICommand = {
        id: -1,
        price: 1.0,
        communication: "",
        sheet_pk: sheet_pk ,
    }


    useEffect(() => {
        console.log(command_pk);
    }, []);

    const sheetShema = yup.object().shape({
        price: yup.number().required(),
        communication: yup.string(),
    });
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(sheetShema),
        defaultValues: LocalGetSheet,
    });
    async function LocalGetSheet(): Promise<ICommand> {
        let command : ICommand = defaultCommand;
        if (command_pk > -1){
            command = await GetCommand(command_pk);
        }
        return command;
    }
    async function OnSubmit(command: ICommand): Promise<void> {
        let status = command_pk > -1 ? await UpdateCommand(command) : await CreateCommand(command);
        if (status.type === "success"){
            toast.success(status.description, getTostifyParams());
            navigate("/staff/sheet/")
        } else{
            toast.error(status.description, getTostifyParams());
        }
    }
    return (
        <>
        <div style={{alignItems: "center", height: "100vh", width: "20%", justifyContent: "center"}}>

            <form style={{display: "flex", flexDirection: "column", gap: "10px"}}
                  onSubmit={handleSubmit((command) => OnSubmit(command as ICommand))}>
                <TextFieldForm displayName={"Prix"} register={register} formName={'price'} errors={errors}/>
                <TextFieldForm displayName={"Communicaton"} register={register} formName={'communication'} errors={errors}/>
                <div style={{display: "flex"}}>
                    <Button type="submit">Envoyer </Button>
                    <Button onClick={(): void => navigate("/staff/sheet/")}> Retour </Button>
                </div>
            </form>
        </div>
        </>
    );
};