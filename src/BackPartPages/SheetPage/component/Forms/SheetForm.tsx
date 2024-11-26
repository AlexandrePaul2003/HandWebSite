import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import React from "react";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {ISheet} from "../../../../IData/Sheet/ISheet";
import {CreateSheet, GetSheet, UpdateSheet} from "../../../../Services/SheetService";
import {Button, Chip} from "@mui/material";
import {ICommand} from "../../../../IData/Command/ICommand";
import {toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {getTostifyParams} from "../../../../Helper/TostifyHelper";
import {IError} from "../../../../IData/IError";
import {TextFieldForm} from "../../../../components/Form/TextFieldForm";


export function SheetForm(): JSX.Element {

    const navigate: NavigateFunction = useNavigate();
    const sheet_pk: number = Number(useParams().Id);
    const [ isLoading, setLoading ] = React.useState<boolean>(false);
    const [defaultSheet, setDefaultSheet ]= React.useState<ISheet>({
        id: -1,
        name: "",
        communication: "",
        commands: [],
        total: 0,
    });


    const sheetShema = yup.object().shape({
        name: yup.string().required("Impossible de créer une ligne sans nom !"),
        communication: yup.string(),
    });
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(sheetShema),
        defaultValues: LocalGetSheet,
    });
    const { errors } = formState;
    async function LocalGetSheet(): Promise<ISheet> {
        let sheet : ISheet = defaultSheet;
        if (sheet_pk > -1){
            sheet = await GetSheet(sheet_pk);
            console.log(sheet);
        }
        setLoading(false);
        setDefaultSheet(sheet);
        return sheet;
    }
    async function OnSubmit(sheet: ISheet): Promise<void> {
        console.log(errors);
        let status: IError = sheet_pk > -1 ? await UpdateSheet(sheet) : await CreateSheet(sheet);
        if (status.type === "success"){
            toast.success(status.description, getTostifyParams());
            navigate("/staff/sheet/")
        } else{
            toast.error(status.description, getTostifyParams());
        }


    }
    return (
        <>
            <h1>Ajouter une ligne dans la feuille</h1>
            {!isLoading && (
                <div style={{display: "flex"}}>
                    <div style={{
                        alignItems: "center",
                        height: "20%",
                        width: "20%",
                        justifyContent: "center",
                        marginRight: "5%"
                    }}>
                        <form style={{display: "flex", flexDirection: "column", gap: "10px"}}
                              onSubmit={handleSubmit((sheet) => OnSubmit(sheet as ISheet))}>
                            <TextFieldForm displayName={"Nom"} register={register} formName={'name'} errors={errors}/>
                            <TextFieldForm displayName={"Communicaton"} register={register} formName={'communication'} errors={errors}/>
                            <div style={{display: "flex"}}>
                                <Button type="submit">Envoyer </Button>
                                <Button onClick={(): void => navigate("/staff/sheet/")}>Retour </Button>
                            </div>
                        </form>

                    </div>
                    {sheet_pk > -1 && (
                        <div style={{alignItems: "center", height: "100vh", width: "100%", justifyContent: "center"}}>
                            {defaultSheet.commands.length > 0 ? (
                                <div>
                                    {"Détails de la feuille:"} <br/>
                                    {defaultSheet.commands.map((command: ICommand, key: number) => (
                                        <>
                                            <Chip color={command.price >= 0 ? "success" : "error"}
                                                  style={{marginRight: "0.15%", height: "40px", width: "8%", marginBottom: "0.2%"}}
                                                  label={command.price.toFixed(2)}
                                                  key={key}/>
                                            {key % 20 === 0 && (<br/>)}
                                        </>
                                    ))} <br/>
                                    {"Total:"} <br/>
                                    <Chip color={defaultSheet.total >= 0 ? "success" : "error"}
                                          style={{marginRight: "0.15%", height: "40px", width: "16%"}}
                                          label={defaultSheet.total.toFixed(2)}/>
                                </div>
                            ) : (
                                <span>{"Aucune commande"}</span>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}