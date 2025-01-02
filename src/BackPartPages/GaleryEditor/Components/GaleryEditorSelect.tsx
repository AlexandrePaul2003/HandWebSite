import {useEffect, useState} from "react";
import {GetAllSubjects} from "../../../Services/GalerySubjectService";
import {IGalerySubject} from "../../../IData/GalerySubject/IGalerySubject";
import {Select} from "../../../components/Form/Select";
import {IOption} from "../../../IData/IOption";

interface IProps {
    onChange: (option: IOption) => void;
}

export function GaleryEditorSelect(props: IProps): JSX.Element {
    const [selectOptions, setSelectOptions] =  useState<IOption[]>([]);
    const [isCharged, setIsCharged] = useState(false);
    useEffect(() => {
        GetAllSubjects().then(function(result: IGalerySubject[]): void {
            let options: IOption[] = [];
            options = options.concat({label: "Toutes", value: -1})
            result.map((res: IGalerySubject): void => {
                options = options.concat({label: res.name, value: res.id})
            });
            console.log(options)
            setSelectOptions(options);
            setIsCharged(true);
        });
    }, []);
    return (
        <>
            <div>
                {isCharged ? (<Select isForm={false} options={selectOptions} onChange={(value)=> props.onChange(value)} name={""}/>) : (<h1>test</h1>)}
            </div>
        </>
    );
}