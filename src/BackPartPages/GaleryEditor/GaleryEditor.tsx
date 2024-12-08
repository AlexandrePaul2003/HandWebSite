import {GaleryEditorSelect} from "./Components/GaleryEditorSelect";
import {IOption} from "../../IData/IOption";
import {GaleryEditorSubjectForm} from "./Components/GaleryEditorSubjectForm";


export function GaleryEditor(): JSX.Element{


    return (
        <>
            <div className="flex">
                <div className="w-3/12">
                    <GaleryEditorSelect onChange={(value: IOption) => console.log(value)}/>
                </div>
                <div className="w-3/12">
                    <GaleryEditorSubjectForm subject_pk={-1}/>
                </div>
            </div>
        </>
    );
};