
import {ErrorMessage} from "@hookform/error-message";
import React, {useEffect} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.core.css";
interface IProps {
    displayName: string;
    getValues: any;
    formName: string;
    errors: any;
    setValue: any;
}

export function QuillForm(props: IProps): JSX.Element {

    return (
        <>
            <span> {props.displayName}</span>
            {props.getValues(props.formName) !== undefined && (
                <ReactQuill
                    onChange={(e) => props.setValue(props.formName, e)}
                    defaultValue={String(props.getValues(props.formName))}
                />
            )}
            <ErrorMessage errors={props.errors} name={props.formName} />

        </>
    );
}