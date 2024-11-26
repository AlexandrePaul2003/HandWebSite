import {TextField} from "@mui/material";
import React from "react";
import { ErrorMessage } from "@hookform/error-message"
interface IProps {
    displayName: string;
    register: any;
    formName: string;
    errors: any;
}
export function TextFieldForm(props: IProps){
    return (
        <>
            <span> {props.displayName}</span>
            <TextField {...props.register(props.formName)} />
            <ErrorMessage errors={props.errors} name={props.formName} />
        </>
    );
}